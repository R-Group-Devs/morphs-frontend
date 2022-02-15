import styled from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
`;

const ErrorLogo = styled(Logo)`
  @media (max-width: 580px) {
    margin-top: 0;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 1em;
`;

export default () => (
  <Container>
    <ErrorLogo />
    <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
  </Container>
);
