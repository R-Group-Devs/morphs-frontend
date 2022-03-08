import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import { MorphsMetadata } from '../lib/morphs';
import { COLORS } from '../constants/theme';

const Container = styled.li`
  flex: 0 1 calc(33.333333% - 1em);
  border: 1px solid ${lighten(0.1, COLORS.black)};

  @media (max-width: 767px) {
    flex: 0 1 calc(50% - 0.75em);
  }

  @media (max-width: 580px) {
    flex: 0 1 100%;
  }
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

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
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
      <ImgContainer>
        <Img src={image} alt={name} />
      </ImgContainer>

      <Content>
        <Name>{name}</Name>
      </Content>
    </StyledLink>
  </Container>
);
