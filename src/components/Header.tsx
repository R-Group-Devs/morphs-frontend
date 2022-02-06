import styled from 'styled-components';
import Logo from './Logo';
import ConnectWallet from './ConnectWallet';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default () => (
  <Container>
    <Logo />
    <ConnectWallet />
  </Container>
);
