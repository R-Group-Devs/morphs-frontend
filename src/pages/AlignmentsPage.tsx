import { Suspense } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import SigilAlignmentTable from '../components/SigilAlignmentTable';
import LoadingIndicator from '../components/LoadingIndicator';
import useAlignments from '../hooks/useAlignments';
import { FONTS } from '../constants/theme';

const Description = styled.div`
  margin: 3.5em 0 3em;
  max-width: 600px;
  line-height: 32px;
`;

const Header = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Heading = styled.h2`
  font-family: ${FONTS.sansSerif};

  @media (max-width: 580px) {
    margin-bottom: 2em;
  }
`;

const Counts = styled.div`
  display: flex;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Count = styled.div`
  @media (max-width: 400px) {
    margin-bottom: 0.5em;
  }

  &:last-child {
    margin-left: 2em;
  }

  @media (max-width: 400px) {
    &:last-child {
      margin-left: 0;
    }
  }
`;

const CountLabel = styled.span`
  margin-right: 0.5em;
  font-weight: 700;

  &:after {
    content: ':';
    display: inline;
  }
`;

const Alignments = () => {
  const { data } = useAlignments();

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <animated.div style={mountAnimationProps}>
      <Description>
        <p>
          The Alignments database tracks info about the Sigil Alignments of certain Morphs. The
          Playgrounds Research team is still determining the purpose of these Sigils...
        </p>
      </Description>

      <Header>
        <Heading>Alignments</Heading>

        <Counts>
          <Count>
            <CountLabel>Aligned</CountLabel>
            ---
          </Count>

          <Count>
            <CountLabel>Unaligned</CountLabel>
            ---
          </Count>
        </Counts>
      </Header>

      <SigilAlignmentTable alignments={data || []} />
    </animated.div>
  );
};

export default () => (
  <>
    <Helmet>
      <title>Alignments</title>
    </Helmet>

    <Suspense fallback={<LoadingIndicator />}>
      <Alignments />
    </Suspense>
  </>
);
