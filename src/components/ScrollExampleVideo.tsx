import styled from 'styled-components';
import scrollExampleImage from '../assets/images/scroll-example.png';
import { COLORS } from '../constants/theme';

interface Props {
  onClick?: () => void;
}

const Video = styled.video`
  margin-top: -0.5em;
  margin-bottom: 1.75em;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid ${COLORS.white};
`;

export default ({ onClick }: Props) => (
  <Video
    src="./videos/scrolls-display.mp4"
    onClick={(e) => {
      e.preventDefault();

      if (onClick) {
        onClick();
      }
    }}
    autoPlay
    loop
    muted
    playsInline
    controlsList="nodownload"
    poster={scrollExampleImage}
  />
);
