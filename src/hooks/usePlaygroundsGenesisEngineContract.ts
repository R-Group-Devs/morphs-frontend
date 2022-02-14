import { useContract, useSigner } from 'wagmi';
import { PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES } from '../constants/contracts';
import useChainId from './useChainId';
import playgroundsGenesisEngineAbi from '../constants/abis/PlaygroundsGenesisEngine.json';

export default () => {
  const [{ data: signer }] = useSigner();
  const chainId = useChainId();

  const contract = useContract({
    addressOrName: PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES[chainId],
    contractInterface: playgroundsGenesisEngineAbi,
    signerOrProvider: signer,
  });

  return contract;
};
