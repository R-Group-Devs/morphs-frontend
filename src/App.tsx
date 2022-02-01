import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Logo from './components/Logo';
import Description from './components/Description';

const Container = styled.div`
  margin: 2em auto;
  padding: 0 2em;
  max-width: 1080px;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Logo />
      <Description />
    </Container>
  );
};

export default App;
