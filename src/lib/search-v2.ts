import { BigNumber } from "ethers"
import { MORPHS_NFT_CONTRACT_ADDRESSES } from "../constants/contracts"
import { getGraphClient } from "./graph"
import { NftOwner_Filter, NftOwner_OrderBy, Nft_Filter, Nft_OrderBy, OrderDirection, TokenStorageValue_Filter, TokenStorageValue_OrderBy } from "./graph-generated"

export interface OwnerFilter {
  type: 'owner'
  address: string
}

export interface SigilFilter {
  type: 'sigil'
  /** return morphs with any of these sigils */
  sigils: string[]
}

export interface HasSigilFilter {
  type: 'has sigil'
}

export interface AffinityFilter {
  type: 'affinity'
  /** not possible to query for citizen atm lol */
  affinity: 'mythical' | 'cosmic' | 'celestial'
}

export interface SignatureFilter {
  type: 'signature'
  signature: BigNumber
}

export interface EraFilter {
  type: 'era'
  era: 'genesis I' | 'genesis II'
}

export type SearchFilter =
  OwnerFilter |
  SigilFilter |
  HasSigilFilter |
  EraFilter |
  AffinityFilter |
  SignatureFilter;

export interface SearchQuery {
  cursor?: string
  filter?: SearchFilter
  /** up to 1000 at a time ... don't be too greedy! */
  limit?: number
}

export interface SearchResponse {
  tokenIds: string[]
  nextCursor?: string
}

/**
 * Search them morphs
 */
export const searchMorphsV2 = async (query: SearchQuery = {}, chainId = 1): Promise<SearchResponse> => {
  const client = getGraphClient(chainId);
  const collection = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];

  // build a graph filter based on the query filter input

  let tokenStorageValueFilter: TokenStorageValue_Filter | undefined;
  let nftOwnerFilter: NftOwner_Filter | undefined;
  let nftFilter: Nft_Filter | undefined;

  switch (query.filter?.type) {
    case 'affinity':
      tokenStorageValueFilter = { key: 'flag' };
      switch (query.filter.affinity) {
        case 'celestial':
          tokenStorageValueFilter.intValue_gt = '2';
          break;
        case 'cosmic':
          tokenStorageValueFilter.intValue = '2';
          break;
        case 'mythical':
          tokenStorageValueFilter.intValue = '1';
          break;
      }
      break;
    case 'has sigil':
      tokenStorageValueFilter = { key: 'sigil' };
      break;
    case 'owner':
      nftOwnerFilter = { owner: query.filter.address.toLowerCase() };
      break;
    case 'sigil':
      tokenStorageValueFilter = { key: 'sigil', stringValue_in: query.filter.sigils };
      break;
    case 'signature':
      tokenStorageValueFilter = { key: 'flag', intValue: query.filter.signature.toString() };
      break;
    case 'era':
      nftFilter = query.filter.era === 'genesis I'
        ? { tokenId_lt: '12651' }
        : { tokenId_gte: '12651' };
      break;
    default:
      nftFilter = { };
      break;
  }

  // execute the graph query based on the type of node we need to search

  let tokenIds: string[] = [];
  const limit = Math.min(1000, query.limit ?? 20);

  if (tokenStorageValueFilter) {
    const filter = { ...tokenStorageValueFilter, collection };
    if (query.cursor) {
      filter.nftTokenId_gt = query.cursor;
    }
    const resp = await client.getTokenStorage({
      limit,
      filter,
      orderBy: TokenStorageValue_OrderBy.NftTokenId,
      orderDirection: OrderDirection.Asc
    });
    tokenIds = resp.data?.tokenStorageValues.map(tsv => tsv.nft.tokenId) ?? [];
  }
  else if (nftOwnerFilter) {
    const filter = { ...nftOwnerFilter, collection };
    if (query.cursor) {
      filter.nftTokenId_gt = query.cursor;
    }
    const resp = await client.getNftOwners({
      limit,
      filter,
      orderBy: NftOwner_OrderBy.NftTokenId,
      orderDirection: OrderDirection.Asc,
    });
    tokenIds = resp.data?.nftowners.map(owner => owner.nft.tokenId) ?? [];
  }
  else if (nftFilter) {
    const filter = { ...nftFilter, collection };
    if (query.cursor) {
      filter.tokenId_gt = query.cursor;
    }
    const resp = await client.getNfts({
      limit,
      filter,
      orderBy: Nft_OrderBy.TokenId,
      orderDirection: OrderDirection.Asc,
    });

    tokenIds = resp.data?.nfts.map(nft => nft.tokenId) ?? [];
  }
  else {
    throw new Error('invalid query'); // should never happen
  }

  return {
    tokenIds,
    nextCursor: tokenIds.length > 0 ? tokenIds[tokenIds.length - 1] : undefined
  }

}
