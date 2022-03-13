import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
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
  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <Container>
      <Helmet>
        <title>Connect Wallet</title>
      </Helmet>

      <animated.div style={mountAnimationProps}>
        <Message>You don't have a wallet connected.</Message>

        <SeeScrollsButton />
      </animated.div>
    </Container>
  );
};
