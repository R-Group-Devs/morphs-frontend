import { Provider, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

interface Props {
  children: React.ReactNode;
}

const connectors = [
  new InjectedConnector({ chains: defaultChains }),
  new WalletConnectConnector({
    chains: defaultChains,
    options: {
      infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
      qrcode: true,
    },
  }),
];

export default ({ children }: Props) => <Provider connectors={connectors}>{children}</Provider>;
