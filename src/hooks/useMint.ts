import { useState, useCallback } from 'react';
import { useNetwork } from 'wagmi';
import usePlaygroundsGenesisEngineContract from '../hooks/usePlaygroundsGenesisEngineContract';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

interface State {
  // TODO: define this shape
  data: any;
  error: Error;
  loading: boolean;
}

export default () => {
  const playgroundsGenesisEngineContract = usePlaygroundsGenesisEngineContract();
  const [{ data: network }] = useNetwork();
  const [data, setData] = useState();

  const mint = useCallback(async () => {
    const data = await playgroundsGenesisEngineContract.mint(
      // TODO: use mainnet fallback
      MORPHS_NFT_CONTRACT_ADDRESSES[network?.chain?.id ?? 4],

      // TODO: check input code
      false
    );

    setData(data);

    // TODO: add loading state
    // TODO: add error state

    return data;
  }, [playgroundsGenesisEngineContract]);

  return [{ data }, mint] as [State, () => Promise<State>];
};
