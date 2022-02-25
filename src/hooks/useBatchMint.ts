import { useCallback } from 'react';
import useChainId from './useChainId';
import usePlaygroundsEngineContract from './usePlaygroundsEngineContract';
import useExecuteTransaction from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const playgroundsEngineContract = usePlaygroundsEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const chainId = useChainId();
  const { signer } = playgroundsEngineContract;

  const batchMint = useCallback(
    async (count: number) => {
      executeTransaction(() =>
        playgroundsEngineContract.batchMint(MORPHS_NFT_CONTRACT_ADDRESSES[chainId], count)
      );
    },
    [chainId, playgroundsEngineContract, executeTransaction]
  );

  return [{ data, state, error, signer }, batchMint] as const;
};
