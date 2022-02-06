import { useConnect, useAccount } from 'wagmi';
import styled from 'styled-components';
import { shortenAddress } from '../utils/address';

const ConnectWalletButton = styled.button`
  padding: 15px 25px;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: #f8f4ec;
  background: none;
  border: 3px solid #5b4dc8;
  transition: all 0.3s;

  &:hover {
    background: #7265d7;
    color: #ffffff;
    cursor: pointer;
  }
`;

export default () => {
  const [{ data, error: connectError, loading: isConnecting }, connect] = useConnect();
  const [{ data: account, error: accountError, loading: isLoadingAccount }] = useAccount();

  return (
    <ConnectWalletButton onClick={() => connect(data.connectors[0])}>
      {data.connected ? shortenAddress(account?.address ?? '') : 'Connect Wallet'}
    </ConnectWalletButton>
  );
};
