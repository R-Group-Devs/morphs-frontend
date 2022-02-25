import { useContract, useSigner } from 'wagmi';
import { PLAYGROUNDS_ENGINE_CONTRACT_ADDRESSES } from '../constants/contracts';
import useChainId from './useChainId';
import playgroundsEngineAbi from '../constants/abis/PlaygroundsEngine.json';

export default () => {
  const [{ data: signer }] = useSigner();
  const chainId = useChainId();

  const contract = useContract({
    addressOrName: PLAYGROUNDS_ENGINE_CONTRACT_ADDRESSES[chainId],
    contractInterface: playgroundsEngineAbi,
    signerOrProvider: signer,
  });

  return contract;
};
