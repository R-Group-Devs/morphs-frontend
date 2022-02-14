import { useCallback } from 'react';
import useChainId from './useChainId';
import usePlaygroundsGenesisEngineContract from './usePlaygroundsGenesisEngineContract';
import useExecuteTransaction from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const playgroundsGenesisEngineContract = usePlaygroundsGenesisEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const chainId = useChainId();
  const { signer } = playgroundsGenesisEngineContract;

  const mint = useCallback(
    async (flag: number) => {
      executeTransaction(() =>
        playgroundsGenesisEngineContract.mint(MORPHS_NFT_CONTRACT_ADDRESSES[chainId], flag)
      );
    },
    [chainId, playgroundsGenesisEngineContract, executeTransaction]
  );

  return [{ data, state, error, signer }, mint] as const;
};
