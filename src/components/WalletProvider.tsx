import styled from 'styled-components';

const WalletProviderDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const WalletProviderDescription = styled.div`
  margin-top: 1em;
  font-size: 14px;
  font-weight: 400;
`;

const WalletIcon = styled.img`
  width: 24px;
`;

export { WalletProviderDetails, WalletProviderDescription, WalletIcon };
