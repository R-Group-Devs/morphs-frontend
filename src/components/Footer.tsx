import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import shapesPanelImage from '../assets/images/shapes-panel.png';
import shapesPanelImageMobile from '../assets/images/shapes-panel-mobile.png';
import { COLORS } from '../constants/theme';

const Container = styled.footer`
  margin-top: 2em;

  @media (max-width: 767px) {
    margin-top: 3em;
  }
`;

const MorphsShapesBannerVideo = styled.video`
  margin: 0 -32px;
  width: calc(100% + 64px);
  transition-duration: 0.7s;
`;

const FooterText = styled.p`
  margin-top: 2.25em;
  font-size: 12px;
  font-weight: normal;
  line-height: 2em;
  color: ${COLORS.white};
`;

export default () => {
  const isSmallViewport = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <Container>
      {isSmallViewport ? (
        <MorphsShapesBannerVideo
          src="./videos/morphs-shapes-banner-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          controlsList="nodownload"
          poster={shapesPanelImageMobile}
        />
      ) : (
        <MorphsShapesBannerVideo
          src="./videos/morphs-shapes-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          controlsList="nodownload"
          poster={shapesPanelImage}
        />
      )}
      <FooterText>
        Morphs is an NFT PFP project that evolves over time. Mint yourself a mystery scroll for free
        (gas only) and wait to see what happens… Follow{' '}
        <a href="https://twitter.com/playgroundswtf" target="_blank" rel="noreferrer">
          @playgroundswtf
        </a>{' '}
        for updates.
      </FooterText>
    </Container>
  );
};
