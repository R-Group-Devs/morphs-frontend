import styled from 'styled-components';
import Logo from './Logo';
import ConnectWalletButton from './ConnectWalletButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column-reverse;
  }
`;

export default () => (
  <Container>
    <Logo />
    <ConnectWalletButton />
  </Container>
);
