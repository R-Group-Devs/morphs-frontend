import { useConnect } from 'wagmi';

export default () => {
  const [{ data: wallet }] = useConnect();

  const connectedWallet = localStorage.getItem('wagmi.wallet');
  const shimDisconnect = localStorage.getItem('wagmi.shimDisconnect');
  const shouldAutoConnect =
    shimDisconnect ||
    (connectedWallet !== `"${wallet.connectors[0].name}"` && connectedWallet !== null);

  return shouldAutoConnect;
};
