import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Animated from '../components/Animated';
import Description from '../components/Description';
import ScrollExampleVideo from '../components/ScrollExampleVideo';
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

export default () => (
  <>
    <Helmet titleTemplate="">
      <title>Morphs NFTs</title>
    </Helmet>

    <Animated>
      <Content>
        <Panel>
          <Description />
        </Panel>

        <Panel right>
          <ScrollExampleVideo />
        </Panel>
      </Content>

      <Footer />
    </Animated>
  </>
);
