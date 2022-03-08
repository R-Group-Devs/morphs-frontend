import { NETWORKS } from './networks';

export const RPC_URLS = {
  [NETWORKS.ethereum]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  [NETWORKS.rinkeby]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
} as const;
