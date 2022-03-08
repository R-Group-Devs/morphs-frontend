import styled from 'styled-components';
import { COLORS, FONTS } from '../constants/theme';

export default styled.input<{ $hasError: boolean }>`
  padding: 4px 12px;
  width: 100%;
  min-height: 33px;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: normal;
  color: ${COLORS.white};
  line-height: 2em;
  text-align: center;
  background: #2e2e2e;
  border: ${({ $hasError }) =>
    $hasError ? `1px solid ${COLORS.accent.normal}` : '1px solid transparent'};
  border-radius: 0;
  caret-color: ${COLORS.white};
  transition: color 0.3s, border-color 0.3s;

  &:focus {
    outline: none;
  }

  &::selection {
    color: ${COLORS.white};
    background: #666;
  }
`;
