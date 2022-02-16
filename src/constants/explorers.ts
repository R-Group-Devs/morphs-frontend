import { NETWORKS } from './networks';

export const BLOCK_EXPLORER_URLS = {
  [NETWORKS.ethereum]: 'https://etherscan.io',
  [NETWORKS.rinkeby]: 'https://rinkeby.etherscan.io',
} as const;

export const NFT_EXPLORER_URLS = {
  [NETWORKS.ethereum]: 'https://rarible.com',
  [NETWORKS.rinkeby]: 'https://rinkeby.rarible.com',
} as const;
