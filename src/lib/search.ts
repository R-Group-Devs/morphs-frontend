import { MORPHS_NFT_CONTRACT_ADDRESSES } from "../constants/contracts";
import { RPC_URLS } from "../constants/rpc";
import { getGraphClient } from "./graph";
import { Nft_OrderBy, OrderDirection, TokenStorageValue_Filter, TokenStorageValue_OrderBy } from "./graph-generated";
import { batchGetMorphDetails, MorphsMetadata } from "./morphs";

export interface MorphsQuery {
  sigils?: string[]
  cursor?: string
}

export interface MorphsQueryResponse {
  morphs: MorphsMetadata[]
  nextCursor?: string
}

export const searchMorphs = async (query: MorphsQuery = {}, chainId = 1): Promise<MorphsQueryResponse> => {
  const client = getGraphClient(chainId);
  const collection = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];
  const rpcUrl = RPC_URLS[chainId];

  let tokenStorageValueFilter: TokenStorageValue_Filter | undefined;

  if (query.sigils) {
    tokenStorageValueFilter = { collection, key: 'sigil', stringValue_in: query.sigils };
  }

  let tokenIds: string[] = [];
  let nextCursor: string | undefined = undefined;

  if (tokenStorageValueFilter) {
    const resp = await client.getTokenStorage({
      filter: tokenStorageValueFilter,
      orderBy: TokenStorageValue_OrderBy.UpdatedAtTimestamp,
      orderDirection: OrderDirection.Asc
    });

    if (resp.errors?.length) {
      throw new Error('Graph request failed');
    }

    tokenIds = resp.data?.tokenStorageValues.map(tsv => tsv.nft.tokenId) ?? [];

    // TODO: need to handle cursor if there is a sigil with > 100 NFTs
  }

  // default to searching entire collection
  else {
    const resp = await client.getNfts({
      filter: query.cursor ? { tokenId_gt: query.cursor } : undefined,
      orderBy: Nft_OrderBy.TokenId,
      orderDirection: OrderDirection.Asc
    });

    tokenIds = resp.data?.nfts.map(nft => nft.tokenId) ?? [];

    if (tokenIds.length > 0) {
      nextCursor = tokenIds[tokenIds.length - 1];
    }
  }

  const morphs = await batchGetMorphDetails(chainId, rpcUrl, tokenIds);

  return { morphs, nextCursor };
}
