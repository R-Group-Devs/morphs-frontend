import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ErrorBoundary } from 'react-error-boundary';
import * as Dialog from '@radix-ui/react-dialog';
import { Helmet } from 'react-helmet';
import WalletProvider from '../providers/WalletProvider';
import QueryProvider from '../providers/QueryProvider';
import GlobalStyle from './GlobalStyle';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import ConnectWalletModal from './ConnectWalletModal';
import ProgressBar from './ProgressBar';
import AppErrorMessage from './AppErrorMessage';
import useGlobalState from '../hooks/useGlobalState';

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 2em;
  max-width: 1080px;

  @media (max-width: 767px) {
    padding: 2em;
    max-width: 100%;
  }
`;

const App = ({ children }: Props) => {
  const [isConnectWalletModalOpen] = useGlobalState('isConnectWalletModalOpen');

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
      <ScrollToTop />
      <Helmet titleTemplate="Morphs NFTs / %s" />

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

            <Dialog.Root open={isConnectWalletModalOpen}>
              <ConnectWalletModal />
            </Dialog.Root>
          </QueryProvider>
        </WalletProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
