import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';
import ConnectWalletButton from './ConnectWalletButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5em;

  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: row-reverse;
  }

  @media (max-width: 650px) {
    margin: 2em 3em 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
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
