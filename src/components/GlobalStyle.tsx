import { createGlobalStyle } from 'styled-components';
import { ModalOverlayStyles } from '../components/Modal';
import { COLORS, FONTS } from '../constants/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${COLORS.black};
    font-family: ${FONTS.mono};
    font-weight: 300;
    color: ${COLORS.white};
  }

  &:focus {
    outline-color: ${COLORS.primary.normal};
  }

  a {
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

  ::selection {
    background: ${COLORS.primary.light};
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
    ${ModalOverlayStyles}
    transition: all 0.3s;
  }

  .walletconnect-qrcode__base {
    && {
      ${ModalOverlayStyles}
      transition: all 0.3s;
    }
  }

  .-walletlink-extension-dialog-container ::selection {
    background: highlight;
  }
`;
