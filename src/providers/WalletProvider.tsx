import { Provider, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

interface Props {
  children: React.ReactNode;
}

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
      jsonRpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    },
  }),
];

export default ({ children }: Props) => (
  <Provider connectors={connectors} autoConnect>
    {children}
  </Provider>
);
