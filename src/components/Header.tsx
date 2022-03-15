import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Logo from './Logo';
import Nav from './Nav';
import MobileNav from './MobileNav';
import ConnectWalletButton from './ConnectWalletButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 64px;

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

const Secondary = styled.div`
  display: flex;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

export default () => {
  const isSmallViewport = useMediaQuery({
    query: '(max-width: 650px)',
  });

  const isMediumViewport = useMediaQuery({
    query: '(max-width: 1060px)',
  });

  return (
    <Container>
      <Main>
        <Logo />
        {!isMediumViewport && <Nav />}
        {isSmallViewport && <MobileNav />}
      </Main>

      <Secondary>
        <ConnectWalletButton />
        {isMediumViewport && !isSmallViewport && <MobileNav />}
      </Secondary>
    </Container>
  );
};
