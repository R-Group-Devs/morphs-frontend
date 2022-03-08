import { providers } from 'ethers';
import { Provider, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { RPC_URLS } from '../constants/rpc';

interface Props {
  children: React.ReactNode;
}

interface ProviderConfig {
  chainId?: number;
}

const provider = ({ chainId }: ProviderConfig) =>
  new providers.InfuraProvider(chainId, process.env.REACT_APP_INFURA_PROJECT_ID);

const connectors = [
  new InjectedConnector({
    chains: defaultChains,
    options: {
      shimDisconnect: true,
    },
  }),
  new WalletConnectConnector({
    chains: defaultChains,
    options: {
      infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
      qrcode: true,
    },
  }),
  new WalletLinkConnector({
    options: {
      appName: 'Morphs',
      jsonRpcUrl: RPC_URLS[1],
    },
  }),
];

export default ({ children }: Props) => (
  <Provider provider={provider} connectors={connectors} autoConnect>
    {children}
  </Provider>
);
