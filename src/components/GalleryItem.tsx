import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import { MorphsMetadata } from '../lib/morphs';
import { COLORS } from '../constants/theme';

const Container = styled.li`
  flex: 0 1 calc(33.333333% - 1em);
  border: 1px solid ${lighten(0.1, COLORS.black)};
`;

const StyledLink = styled(Link)`
  color: inherit;

  &:hover {
    color: inherit;
  }

  &:focus {
    outline: none;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
`;

const Content = styled.div`
  padding: 0.5em 1em;
`;

const Name = styled.h3`
  font-size: 16px;
`;

export default ({ name, image, tokenId }: MorphsMetadata) => (
  <Container>
    <StyledLink to={`/token/${tokenId}`}>
      <Img src={image} alt={name} />

      <Content>
        <Name>{name}</Name>
      </Content>
    </StyledLink>
  </Container>
);
