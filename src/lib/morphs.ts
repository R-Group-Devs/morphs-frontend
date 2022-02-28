import {
  Provider as MulticallProvider,
  Contract as MulticallContract,
} from 'ethers-multicall';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from "../constants/contracts";
import { getGraphClient } from "./graph"
import MORPHS from '../constants/abis/Morphs.json';
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAttribute, metadataFromTokenURI, rewriteIpfsUri } from "./nfts";

/** get indexed information about the Morphs collection */
export const getMorphsCollectionDetails = async (chainId: number) => {
  const client = getGraphClient(chainId);
  const collectionAddress = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];
  const resp = await client.collectionDetail({ collectionAddress });
  if (resp?.errors?.length) {
    throw new Error('Could not fetch Morphs collection details');
  }
  return resp?.data?.collection;
}

/** get an array of all owned morph token IDs for a given address */
export const getOwnedMorphs = async (chainId: number, ownerAddress: string) => {
  const client = getGraphClient(chainId);
  const collectionAddress = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];
  const resp = await client.ownedNfts({
    collectionAddress,
    ownerAddress: ownerAddress.toLowerCase()
  });
  if (resp?.errors?.length) {
    throw new Error('Could not fetch owned Morphs');
  }
  return resp.data?.collection?.nftOwners.map(o => o.nft.tokenId);
}

export interface MorphsMetadata {
  tokenId: string
  owner: string
  name: string
  description: string
  /** will be rewritten as an HTTP uri */
  image: string
  attributes: {
    affinity: string
    era: string
    group: string
    palette: string
    quantumStatus: string
    /** Will be "Unaligned" if not set */
    sigil: string
    /**
     * Will be "None" if not celestial. Will be a string decimal number (not
     * hex) even if entangled
     */
    signature: string
    variation: string
  }
}

/** get metadata info about an array of Morphs tokens directly from the chain */
export const batchGetMorphDetails = async (
  chainId: number,
  rpcUrl: string,
  tokenIds: string[]) =>
{
  const address = MORPHS_NFT_CONTRACT_ADDRESSES[chainId];
  const morphs = new MulticallContract(address, MORPHS);
  const provider = new MulticallProvider(
    new StaticJsonRpcProvider(rpcUrl),
    chainId
  );

  const calls = tokenIds.flatMap(id => {
    const getOwner = morphs.ownerOf(id);
    const getTokenURI = morphs.tokenURI(id);
    return [getOwner, getTokenURI];
  });

  const data = await provider.all(calls);

  const projected = tokenIds.map<MorphsMetadata>((tokenId, idx) => {
    const owner = data[idx * 2 + 0];
    const uri = data[idx * 2 + 1];
    const metadata = metadataFromTokenURI(uri);
    return {
      tokenId,
      name: metadata.name,
      description: metadata.description,
      image: rewriteIpfsUri(metadata.image),
      owner,
      attributes: {
        affinity: getAttribute(metadata, 'Affinity'),
        era: getAttribute(metadata, 'Era'),
        group: getAttribute(metadata, 'Group'),
        palette: getAttribute(metadata, 'Palette'),
        quantumStatus: getAttribute(metadata, 'Quantum Status'),
        sigil: getAttribute(metadata, 'Sigil'),
        signature: getAttribute(metadata, 'Signature'),
        variation: getAttribute(metadata, 'Variation')
      }
    }
  });

  return projected;
}
