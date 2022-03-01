import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import PrePostMintCloseRenderer from './PrePostMintCloseRenderer';
import { COLORS, FONTS } from '../constants/theme';

const SpaceContainer = styled.div`
  height: 40px;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  font-family: ${FONTS.sansSerif};
  font-weight: 600;
  background: ${COLORS.primary.normal};
`;

const Label = styled.span`
  margin-right: 16px;
  display: inline-block;
  text-transform: uppercase;
`;

const Unit = styled.span`
  margin: 0 8px 0 5px;
  display: inline-block;
  font-weight: 400;

  &:last-child {
    margin-right: 0;
  }
`;

const PostMintCloseContent = () => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 2000 },
  });

  return (
    <animated.div style={animationProps}>
      <Label>The minting portal has closed</Label>
    </animated.div>
  );
};

export default () => (
  <PrePostMintCloseRenderer>
    {({ completed, days, hours, minutes, seconds }) => (
      <>
        <SpaceContainer />

        <Container>
          {completed ? (
            <PostMintCloseContent />
          ) : (
            <>
              <Label>Minting Closes:</Label>
              {days} <Unit>d</Unit>
              {hours} <Unit>hr</Unit>
              {minutes} <Unit>min</Unit>
              {seconds} <Unit>s</Unit>
            </>
          )}
        </Container>
      </>
    )}
  </PrePostMintCloseRenderer>
);
