import memoize from 'lodash/memoize';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './graph-generated';
import { GRAPH_URLS } from '../constants/graphs';

export const getGraphClient = memoize((chainId: number) => {
  const url = GRAPH_URLS[chainId];
  if (url) {
    throw new Error(`no subgraph for chain id: ${chainId}`);
  }
  const client = new GraphQLClient(url);
  const sdk = getSdk(client);
  return sdk;
});
