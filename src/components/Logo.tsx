import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 64px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.2em;
  color: #f8f4ec;

  @media (max-width: 580px) {
    font-size: 42px;
  }
`;

export default () => <Container>Morphs</Container>;
