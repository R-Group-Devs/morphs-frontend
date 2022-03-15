import 'setimmediate';
import memoize from 'lodash/memoize';
import Dataloader from 'dataloader';
import { batchGetMorphDetails } from './morphs';
import { batchResolveEnsNames } from './ens';

/** get all dataloaders for a specific chain */
export const getLoaders = memoize((chainId = 1) => {
  return {
    tokenData: new Dataloader(
      (keys: readonly string[]) => batchGetMorphDetails(chainId, [...keys])),
    ensName: new Dataloader(
      (addresses: readonly string[]) => batchResolveEnsNames([...addresses])),
  };
});
