import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSpring, animated } from 'react-spring';
import useMorphDetails from '../hooks/useMorphDetails';
import MorphAttributes from './MorphAttributes';
import { COLORS } from '../constants/theme';

interface Props {
  tokenId: string;
}

const Container = styled.div`
  display: flex;
  margin-top: 5em;
  margin-bottom: 5em;

  @media (max-width: 767px) {
    margin-top: 3em;
    flex-direction: column;
  }
`;

const Panel = styled.div<{ right?: boolean }>`
  width: ${({ right }) => (right ? '58.8%' : '41.2%')};
  margin-left: ${({ right }) => (right ? '3em' : 0)};

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid ${COLORS.white};
`;

const Name = styled.h2`
  margin-top: 0;
  font-size: 42px;

  @media (max-width: 767px) {
    margin-top: 1em;
  }
`;

const Description = styled.div`
  margin-top: 2em;
  line-height: 1.5em;

  p {
    margin-bottom: 1.5em;
  }
`;

const Section = styled.div`
  margin-top: 3em;
  padding-top: 3em;
  border-top: 1px solid ${lighten(0.1, COLORS.black)};
`;

const SectionHeading = styled.h3`
  margin: 0;
  margin-bottom: 1.5em;
`;

export default ({ tokenId }: Props) => {
  const { data } = useMorphDetails(tokenId);
  const profileName = data?.owner ?? '';

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    pause: !data,
  });

  return (
    <animated.div style={mountAnimationProps}>
      <Container>
        <Panel>
          <Img src={data?.image} alt={data?.name} />
        </Panel>

        <Panel right>
          <Name>{data?.name}</Name>
          <Description>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.description || ''}</ReactMarkdown>
          </Description>
          <Section>
            <SectionHeading>Attributes</SectionHeading>
            {data?.attributes && <MorphAttributes {...data?.attributes} />}
          </Section>

          <Section>
            <SectionHeading>Owner</SectionHeading>
            <Link to={`/address/${data?.owner}`}>{profileName}</Link>
          </Section>
        </Panel>
      </Container>
    </animated.div>
  );
};
