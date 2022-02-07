import { useConnect } from 'wagmi';

export default () => {
  const [{ data: wallet }] = useConnect();

  const connectedWallet = localStorage.getItem('wagmi.wallet');
  const shimDisconnect = localStorage.getItem('wagmi.shimDisconnect');
  const shouldAutoConnect =
    (connectedWallet === `"${wallet.connectors[0].name}"` && shimDisconnect) ||
    (connectedWallet !== `"${wallet.connectors[0].name}"` && connectedWallet !== undefined);

  return shouldAutoConnect;
};
