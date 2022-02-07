import metamaskIcon from '../assets/images/icons/metamask.png';
import walletConnectIcon from '../assets/images/icons/walletconnect.png';
import walletLinkIcon from '../assets/images/icons/walletlink.png';

interface Wallet {
  icon: string;
  description: string;
}

export const WALLETS: Record<string, Wallet> = {
  injected: {
    icon: metamaskIcon,
    description: 'Easy-to-use browser extension.',
  },
  walletConnect: {
    icon: walletConnectIcon,
    description: 'Connect to wallets with QR code scanning or deep linking.',
  },
  walletLink: {
    icon: walletLinkIcon,
    description: 'Connect your mobile crypto wallet with one click.',
  },
};
