import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Logo from './components/Logo';
import Description from './components/Description';
import MintForm from './components/MintForm';

const Container = styled.div`
  margin: 2em auto;
  padding: 0 2em;
  max-width: 1080px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5em;
`;

const Panel = styled.div`
  width: 45.035%;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Logo />

      <Layout>
        <Panel>
          <Description />
        </Panel>

        <Panel>
          <MintForm />
        </Panel>
      </Layout>
    </Container>
  );
};

export default App;
