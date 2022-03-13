import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Animated from '../components/Animated';
import SeeScrollsButton from '../components/SeeScrollsButton';

const Container = styled.div`
  margin: 5em auto 0;
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

        <SeeScrollsButton />
      </Animated>
    </Container>
  );
};
