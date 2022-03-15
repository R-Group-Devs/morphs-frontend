import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Credits from './Credits';
import shapesPanelImage from '../assets/images/shapes-panel.png';
import shapesPanelImageMobile from '../assets/images/shapes-panel-mobile.png';

const Container = styled.footer`
  margin-top: 3em;
`;

const MorphsShapesBannerVideo = styled.video`
  width: 100%;
  transition-duration: 0.7s;
`;

export default () => {
  const isSmallViewport = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <Container>
      <MorphsShapesBannerVideo
        src={
          isSmallViewport
            ? './videos/morphs-shapes-banner-mobile.mp4'
            : './videos/morphs-shapes-banner.mp4'
        }
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload"
        poster={isSmallViewport ? shapesPanelImageMobile : shapesPanelImage}
      />

      <Credits />
    </Container>
  );
};
