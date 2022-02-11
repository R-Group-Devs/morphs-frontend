import { useMemo } from 'react';

export default () => {
  const connectedWallet = localStorage.getItem('wagmi.wallet');
  const shimDisconnect = localStorage.getItem('wagmi.shimDisconnect');
  const isWalletConnectConnected = localStorage.getItem('walletconnect');

  const shouldAutoConnect = useMemo(() => {
    if (connectedWallet === `"WalletConnect"` && isWalletConnectConnected) {
      return true;
    }

    if (connectedWallet === `"MetaMask"` || connectedWallet === `"Injected"` || shimDisconnect) {
      return true;
    }

    return false;
  }, [connectedWallet, shimDisconnect, isWalletConnectConnected]);

  return shouldAutoConnect;
};
