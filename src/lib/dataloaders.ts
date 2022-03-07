import 'setimmediate';
import memoize from 'lodash/memoize';
import Dataloader from 'dataloader';
import { batchGetMorphDetails } from './morphs';

/** get all dataloaders for a specific chain */
export const getLoaders = memoize((chainId: number, rpcUrl: string) => {
  return {
    tokenData: new Dataloader(
      (keys: readonly string[]) => batchGetMorphDetails(chainId, rpcUrl, [...keys]))
  };
});
