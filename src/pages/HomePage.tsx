import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import Description from '../components/Description';
import ScrollExampleVideo from '../components/ScrollExampleVideo';
import SeeScrollsButton from '../components/SeeScrollsButton';
import Footer from '../components/Footer';

const Content = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Panel = styled.div<{ right?: boolean }>`
  margin-left: ${({ right }) => (right ? '10%' : 0)};
  width: 45%;

  @media (max-width: 767px) {
    width: 100%;
    margin-top: ${({ right }) => (right ? '3em' : 0)};
    margin-left: 0;
  }
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
    <>
      <Helmet titleTemplate="">
        <title>Morphs NFTs</title>
      </Helmet>

      <animated.div style={mountAnimationProps}>
        <Content>
          <Panel>
            <Description />
          </Panel>

          <Panel right>
            <ScrollExampleVideo />
            <SeeScrollsButton />
          </Panel>
        </Content>

        <Footer />
      </animated.div>
    </>
  );
};
