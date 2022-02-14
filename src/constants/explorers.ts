import { NETWORKS } from './networks';

export const BLOCK_EXPLORER_URLS: Record<string, string> = {
  // TODO: enable ethereum block explorer URL
  // [NETWORKS.ethereum]: 'https://etherscan.io',
  [NETWORKS.rinkeby]: 'https://rinkeby.etherscan.io',
};

export const NFT_EXPLORER_URLS: Record<string, string> = {
  // TODO: enable ethereum NFT explorer URL
  // [NETWORKS.ethereum]: 'https://rarible.com',
  [NETWORKS.rinkeby]: 'https://rinkeby.rarible.com',
};
