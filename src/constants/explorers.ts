import { NETWORKS } from './networks';

export const BLOCK_EXPLORER_URLS: Record<string, string> = {
  // [NETWORKS.ethereum]: 'https://etherscan.io',
  [NETWORKS.rinkeby]: 'https://rinkeby.etherscan.io',
};

export const NFT_EXPLORER_URLS: Record<string, string> = {
  // [NETWORKS.ethereum]: 'https://rarible.com',
  [NETWORKS.rinkeby]: 'https://rinkeby.rarible.com',
};
