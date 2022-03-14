import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Animated from '../components/Animated';
import SeeMorphsButton from '../components/SeeMorphsButton';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3em auto 0;
  padding-bottom: 5em;
  max-width: 500px;
`;

const Message = styled.p`
  margin-bottom: 2em;
  text-align: center;
`;

export default () => {
  return (
    <Container>
      <Helmet>
        <title>Connect Wallet</title>
      </Helmet>

      <Animated>
        <Message>You don't have a wallet connected.</Message>

        <SeeMorphsButton />
      </Animated>
    </Container>
  );
};
