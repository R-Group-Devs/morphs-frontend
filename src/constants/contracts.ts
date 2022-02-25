import { NETWORKS } from './networks';

export const PLAYGROUNDS_ENGINE_CONTRACT_ADDRESSES = {
  [NETWORKS.ethereum]: '0x4993838aE8ED82caf02Cc27D820d92333eD04d0F',
  [NETWORKS.rinkeby]: '0x3d28Aeea88f70c4dDc370acC3260ACeF040e9E38',
} as const;

export const MORPHS_NFT_CONTRACT_ADDRESSES = {
  [NETWORKS.ethereum]: '0x480894ceedc8ff63b6db624568f666e634dc8623',
  [NETWORKS.rinkeby]: '0xa857abd882d4f4a5f2e2a7e23c2ab5c34637012a',
} as const;
