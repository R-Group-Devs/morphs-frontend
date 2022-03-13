import { MORPHS_NFT_CONTRACT_ADDRESSES } from "../constants/contracts"
import { getGraphClient } from "./graph"
import { OrderDirection, StorageLocation, StorageType, TokenStorageValue_OrderBy } from "./graph-generated"
import groupBy from 'lodash/groupBy';
import sortBy from "lodash/sortBy";

interface SigilStanding {
  normalizedSigil: string
  sigils: string[]
  tokenIds: string[]
  count: number
}

const normalizeSigil = (sigil: string): string => sigil.toUpperCase();

/**
 * get the sigil leaderboard
 *
 * TODO: this will not work if there are > 1000 sigils set
 */
export const getSigilLeaderboard = async (chainId = 1) => {
  const client = getGraphClient(chainId);
  const collectionAddress = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];

  const resp = await client.getTokenStorage({
    filter: {
      key:'sigil',
      storageType: StorageType.String,
      location: StorageLocation.Engine,
      collection: collectionAddress.toLowerCase(),
    },
    orderBy: TokenStorageValue_OrderBy.UpdatedAtTimestamp,
    orderDirection: OrderDirection.Desc
  });

  if (resp.errors?.length || !resp.data) {
    throw new Error(`Graph request failed`);
  }

  const normalized = resp.data.tokenStorageValues.map(tsv => {
    return {
      tokenId: tsv.nft.tokenId,
      sigil: tsv.stringValue ?? '',
      normalizedSigil: normalizeSigil(tsv.stringValue ?? '')
    }
  });

  const grouped = Object.entries(groupBy(normalized, x => x.normalizedSigil));

  const aggregated = grouped.map<SigilStanding>(([normalizedSigil, group]) => {
    const sigils = Array.from(new Set(group.map(g => g.sigil)));
    const tokenIds = group.map(g => g.tokenId);
    const count = group.length;
    return { normalizedSigil, count, sigils, tokenIds };
  });

  const sorted = sortBy(aggregated, x => x.count).reverse();

  return sorted;
}
