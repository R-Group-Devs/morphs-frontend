import { useNetwork, useContract, useSigner } from 'wagmi';
import { PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES } from '../constants/contracts';
import playgroundsGenesisEngineAbi from '../constants/abis/PlaygroundsGenesisEngine.json';

export default () => {
  const [{ data: network }] = useNetwork();
  const [{ data: signer }] = useSigner();

  const contract = useContract({
    addressOrName: PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES[network?.chain?.id || 4],
    contractInterface: playgroundsGenesisEngineAbi,
    signerOrProvider: signer,
  });

  return contract;
};
