import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import SigilAlignmentTable from '../components/SigilAlignmentTable';
import { FONTS } from '../constants/theme';

const Description = styled.div`
  margin: 3.5em 0 3em;
  max-width: 600px;
  line-height: 32px;
`;

const Header = styled.div`
  margin-bottom: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Heading = styled.h2`
  font-family: ${FONTS.sansSerif};
`;

const CountLabel = styled.span`
  margin-right: 0.5em;
  font-weight: 700;

  &:last-child {
    margin-left: 2em;
  }

  &:after {
    content: ':';
    display: inline;
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
      <Helmet>
        <title>Alignments</title>
      </Helmet>

      <animated.div style={mountAnimationProps}>
        <Description>
          <p>
            The Alignments database tracks info about the Sigil Alignments of certain Morphs. The
            Playgrounds Research team is still determining the purpose of these Sigils...
          </p>
        </Description>

        <Header>
          <Heading>Alignments</Heading>

          <div>
            <CountLabel>Aligned</CountLabel>
            ---
            <CountLabel>Unaligned</CountLabel>
            ---
          </div>
        </Header>

        <SigilAlignmentTable />
      </animated.div>
    </>
  );
};
