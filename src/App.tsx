import styled from 'styled-components';
import WalletProvider from './providers/WalletProvider';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Description from './components/Description';
import MintForm from './components/MintForm';
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

const Panel = styled.div`
  width: 45%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const App = () => {
  return (
    <WalletProvider>
      <Container>
        <GlobalStyle />
        <Header />

        <Content>
          <Panel>
            <Description />
          </Panel>

          <Panel>
            <MintForm />
          </Panel>
        </Content>

        <Footer />
      </Container>
    </WalletProvider>
  );
};

export default App;
