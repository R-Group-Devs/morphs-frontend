import { createGlobalStyle } from 'styled-components';
import { COLORS, FONTS } from '../constants/theme';

export default createGlobalStyle`
  body {
    margin: 0;
    background: ${COLORS.black};
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${COLORS.accent.normal};
  }

  @font-face {
    font-family: 'Morphs Glyphs';
    src: url('./fonts/Morphs-Glyphs.woff2') format('woff2'),
      url('./fonts/Morphs-Glyphs.woff') format('woff'),
      url('./fonts/Morphs-Glyphs.otf') format('otf'),
      url('./fonts/Morphs-Glyphs.ttf') format('ttf');
    font-weight: 300;
    font-style: normal;
    font-display: block;
  }

  body:not(.-walletlink-extension-dialog-box-bottom-description) > :not(#walletconnect-wrapper) {
    font-family: ${FONTS.mono};
    font-weight: 300;
    color: ${COLORS.white};
  }

  body > :not(#walletconnect-wrapper) a {
    color: ${COLORS.accent.normal};
    border-bottom: 1px solid ${COLORS.accent.normal};
    text-decoration: none;
    transition: all 0.2s linear;

    &:hover {
      color: ${COLORS.accent.light};
      border-bottom-color: ${COLORS.accent.light};
    }

    &:focus {
      outline: 1px dotted ${COLORS.accent.normal};
    }

    &:focus:active {
      outline: none;
    }
  }
`;
