import styled from 'styled-components';
import Countdown, { CountdownRenderProps } from 'react-countdown';
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

  &:after {
    content: ':';
  }
`;

const Unit = styled.span`
  margin: 0 8px 0 5px;
  display: inline-block;
  font-weight: 400;

  &:last-child {
    margin-right: 0;
  }
`;

export default () => {
  const endDate = new Date(Date.UTC(2022, 2, 1, 6, 0, 0));

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return null;
    }

    return (
      <>
        <SpaceContainer />

        <Container>
          <Label>Minting Closes</Label>
          {days} <Unit>d</Unit>
          {hours} <Unit>hr</Unit>
          {minutes} <Unit>min</Unit>
          {seconds} <Unit>s</Unit>
        </Container>
      </>
    );
  };

  return <Countdown date={endDate} renderer={renderer} />;
};
