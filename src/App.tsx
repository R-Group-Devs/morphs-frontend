import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ErrorBoundary } from 'react-error-boundary';
import AppErrorMessage from './components/AppErrorMessage';
import WalletProvider from './providers/WalletProvider';
import GlobalStyle from './components/GlobalStyle';
import ProgressBar from './components/ProgressBar';
import MintCountdownBanner from './components/MintCountdownBanner';
import Header from './components/Header';
import Description from './components/Description';
import ScrollExampleVideo from './components/ScrollExampleVideo';
import SeeScrollsButton from './components/SeeScrollsButton';
import Footer from './components/Footer';

const Container = styled.div`
  margin: 0 auto;
  padding: 2em;
  max-width: 1080px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5em;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Panel = styled.div<{ right?: boolean }>`
  margin-left: ${({ right }) => (right ? '10%' : 0)};
  width: 45%;

  @media (max-width: 767px) {
    width: 100%;
    margin-top: ${({ right }) => (right ? '3em' : 0)};
    margin-left: 0;
  }
`;

const App = () => {
  const progressBarAnimationProps = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
    delay: 1000,
    config: {
      duration: 300,
    },
  });

  const contentAnimationProps = useSpring({
    delay: 1300,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <>
      <GlobalStyle />

      <ErrorBoundary fallback={<AppErrorMessage />}>
        <WalletProvider>
          <animated.div style={progressBarAnimationProps}>
            <ProgressBar />
          </animated.div>

          <animated.div style={contentAnimationProps}>
            <Container>
              <MintCountdownBanner />
              <Header />

              <Content>
                <Panel>
                  <Description />
                </Panel>

                <Panel right>
                  <ScrollExampleVideo />
                  <SeeScrollsButton />
                </Panel>
              </Content>

              <Footer />
            </Container>
          </animated.div>
        </WalletProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
