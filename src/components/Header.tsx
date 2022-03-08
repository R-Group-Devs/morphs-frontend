import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';
import ConnectWalletButton from './ConnectWalletButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5em;

  @media (max-width: 580px) {
    flex-direction: column-reverse;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 580px) {
    flex-direction: column-reverse;
  }
`;

export default () => (
  <Container>
    <Main>
      <Logo />
      <Nav />
    </Main>

    <ConnectWalletButton />
  </Container>
);
