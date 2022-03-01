import styled from 'styled-components';
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

export default () => (
  <>
    <SpaceContainer />

    <Container>
      <Label>The minting portal has closed</Label>
    </Container>
  </>
);
