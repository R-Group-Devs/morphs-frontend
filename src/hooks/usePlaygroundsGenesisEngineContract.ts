import { useNetwork, useContract } from 'wagmi';
import { PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES } from '../constants/contracts';
import playgroundsGenesisEngineAbi from '../constants/abis/PlaygroundsGenesisEngine.json';

export default () => {
  const [{ data, error, loading }] = useNetwork();

  const contract = useContract({
    addressOrName: PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES[data?.chain?.id || 4],
    contractInterface: playgroundsGenesisEngineAbi,
  });

  return contract;
};
