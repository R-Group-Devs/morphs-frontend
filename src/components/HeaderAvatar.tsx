import styled, { css } from 'styled-components';
import { COLORS } from '../constants/theme';

const HeaderAvatarStyles = css`
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px solid ${COLORS.white};
  border-radius: 50%;
`;

export default styled.img`
  ${HeaderAvatarStyles}
`;

export const HeaderAvatarPlaceholder = styled.div`
  ${HeaderAvatarStyles}
`;
