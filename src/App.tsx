import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Logo from './components/Logo';
import Description from './components/Description';
import MintForm from './components/MintForm';
import Footer from './components/Footer';

const Container = styled.div`
  margin: 2em auto;
  padding: 0 2em;
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
    <Container>
      <GlobalStyle />
      <Logo />

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
  );
};

export default App;
