import styled, { keyframes } from 'styled-components';
import { Provider, Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import { COLORS, FONTS } from '../constants/theme';

const scaleInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const TooltipTrigger = styled(Trigger)`
  padding: 0;
  width: 100%;
  font-family: ${FONTS.mono};
  font-size: inherit;
  color: ${COLORS.white};
  background: none;
  border: none;
`;

const TooltipContent = styled(Content)`
  padding: 0.25em 1.5em;
  font-size: 12px;
  background: #444;
  border-radius: 2px;
  animation: ${scaleInAnimation} 0.1s ease-out;
`;

const TooltipArrow = styled(Arrow)`
  fill: #444;
`;

export {
  Provider,
  Root,
  TooltipTrigger as Trigger,
  TooltipContent as Content,
  TooltipArrow as Arrow,
};
