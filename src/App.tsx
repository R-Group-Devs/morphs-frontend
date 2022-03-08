import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ErrorBoundary } from 'react-error-boundary';
import WalletProvider from './providers/WalletProvider';
import QueryProvider from './providers/QueryProvider';
import AppErrorMessage from './components/AppErrorMessage';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';
import ProgressBar from './components/ProgressBar';

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 2em;
  max-width: 1080px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const App = ({ children }: Props) => {
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
          <QueryProvider>
            <animated.div style={progressBarAnimationProps}>
              <ProgressBar />
            </animated.div>

            <animated.div style={contentAnimationProps}>
              <Container>
                <Header />

                {children}
              </Container>
            </animated.div>
          </QueryProvider>
        </WalletProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
