import { useCallback } from 'react';
import { BigNumber } from 'ethers';
import useChainId from './useChainId';
import usePlaygroundsEngineContract from './usePlaygroundsEngineContract';
import useExecuteTransaction from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const playgroundsEngineContract = usePlaygroundsEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const chainId = useChainId();
  const { signer } = playgroundsEngineContract;

  const mint = useCallback(
    async (flag: BigNumber) => {
      executeTransaction(() =>
        playgroundsEngineContract.mint(MORPHS_NFT_CONTRACT_ADDRESSES[chainId], flag)
      );
    },
    [chainId, playgroundsEngineContract, executeTransaction]
  );

  return [{ data, state, error, signer }, mint] as const;
};
