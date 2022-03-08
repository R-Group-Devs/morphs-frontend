import useBatchGetMorphDetails from './useBatchGetMorphDetails';

export default (tokenId: string) => {
  const { data, ...rest } = useBatchGetMorphDetails([tokenId]);

  return {
    data: data?.[0],
    ...rest,
  };
};
