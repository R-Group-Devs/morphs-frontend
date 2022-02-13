import { createGlobalStyle } from 'styled-components';
import { COLORS, FONTS } from '../constants/theme';

export default createGlobalStyle`
  body {
    margin: 0;
    background: ${COLORS.black};
    font-family: ${FONTS.mono};
    font-weight: 300;
    color: ${COLORS.white};
  }

  * {
    box-sizing: border-box;
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

  body a {
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

  #walletconnect-wrapper a {
    color: initial;
    border-bottom: initial;

    &:hover {
      border-bottom-color: initial;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }

  .walletconnect-modal__footer a {
    color: #898d97;
  }

  .-walletlink-css-reset .-walletlink-extension-dialog-container .-walletlink-extension-dialog-backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    transition: all 0.3s;
  }

  .walletconnect-qrcode__base {
    && {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(3px);
      transition: all 0.3s;
    }
  }

  ::selection {
    background: ${COLORS.primary.light};
  }

  .-walletlink-extension-dialog-container ::selection {
    background: highlight;
  }
`;
