import { useNetwork, useContract, useSigner } from 'wagmi';
import { PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES } from '../constants/contracts';
import playgroundsGenesisEngineAbi from '../constants/abis/PlaygroundsGenesisEngine.json';

export default () => {
  const [{ data: network }] = useNetwork();
  const [{ data: signer }] = useSigner();
  const chainId =
    network?.chain?.id && network?.chain?.id in PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES
      ? network?.chain?.id
      : // TODO: use mainnet fallback
        4;

  const contract = useContract({
    addressOrName: PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES[chainId],
    contractInterface: playgroundsGenesisEngineAbi,
    signerOrProvider: signer,
  });

  return contract;
};
