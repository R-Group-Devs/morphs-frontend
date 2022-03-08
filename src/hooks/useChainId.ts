import { useNetwork } from 'wagmi';
import { NETWORKS, DEFAULT_NETWORK } from '../constants/networks';

export default () => {
  const [{ data: network }] = useNetwork();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  return isSupportedNetwork ? network.chain.id : DEFAULT_NETWORK;
};
