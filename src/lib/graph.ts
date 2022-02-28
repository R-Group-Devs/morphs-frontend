import memoize from 'lodash/memoize';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './graph-generated';
import { GRAPH_URLS } from '../constants/graphs';

/** get a type graphQL client for the shell subgraph */
export const getGraphClient = memoize((chainId?: number) => {
  if (chainId === undefined) throw new Error();
  const url = GRAPH_URLS[chainId];
  if (!url) {
    throw new Error(`no subgraph for chain id: ${chainId}`);
  }
  const client = new GraphQLClient(url);
  const sdk = getSdk(client);
  return sdk;
});
