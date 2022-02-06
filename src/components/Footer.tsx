import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import shapesPanelImage from '../assets/images/shapes-panel.png';
import shapesPanelImageMobile from '../assets/images/shapes-panel-mobile.png';

const Container = styled.footer`
  margin-top: 2em;

  @media (max-width: 767px) {
    margin-top: 3em;
  }
`;

const ShapesPanelImage = styled.img`
  margin: 0 -32px;
  width: calc(100% + 64px);
  filter: brightness(100%) contrast(100%) saturate(0%) blur(0px) hue-rotate(0deg);
  transition-duration: 0.7s;

  &:hover {
    filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) hue-rotate(0deg);
  }
 );
`;

const ShapesPanelImageMobile = styled(ShapesPanelImage)`
  filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) hue-rotate(0deg);
`;

const FooterText = styled.p`
  margin-top: 2.25em;
  font-family: 'IBM Plex Mono', sans-serif;
  font-size: 12px;
  font-weight: normal;
  line-height: 2em;
  color: #f8f4ec;
`;

export default () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <Container>
      {isMobile ? (
        <ShapesPanelImageMobile src={shapesPanelImageMobile} alt="" />
      ) : (
        <ShapesPanelImage src={shapesPanelImage} alt="" />
      )}
      <FooterText>
        Morphs is an NFT PFP project that evolves over time. Mint yourself a mystery scroll for free
        (gas only) and wait to see what happens… Follow{' '}
        <a href="https://twitter.com/playgroundswtf" target="_blank" rel="noopener">
          @playgroundswtf
        </a>{' '}
        for updates.
      </FooterText>
    </Container>
  );
};
