import { NETWORKS } from './networks';

export const BLOCK_EXPLORER_URLS = {
  // TODO: enable ethereum block explorer URL
  // [NETWORKS.ethereum]: 'https://etherscan.io',
  [NETWORKS.rinkeby]: 'https://rinkeby.etherscan.io',
} as const;

export const NFT_EXPLORER_URLS = {
  // TODO: enable ethereum NFT explorer URL
  // [NETWORKS.ethereum]: 'https://opensea.io',
  [NETWORKS.rinkeby]: 'https://testnets.opensea.io',
} as const;

export const NFT_COLLECTION_NAMES = {
  // TODO: enable ethereum NFT collection name
  // [NETWORKS.ethereum]: 'morphswtf',
  [NETWORKS.rinkeby]: 'morphs',
} as const;
