import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    background: #1a1a1a;
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

  ::selection {
    background: #f55a76;
  }

  body:not(.-walletlink-extension-dialog-box-bottom-description) > :not(#walletconnect-wrapper) {
    font-family: 'IBM Plex Mono', sans-serif;
    color: #f4f4ec;
  }

  body > :not(#walletconnect-wrapper) a {
    color: #f55a76;
    border-bottom: 1px solid #f55a76;
    text-decoration: none;
    transition: all 0.2s linear;

    &:hover {
      color: #ecbacd;
      border-bottom-color: #ecbacd;
    }

    &:focus {
      outline: 1px dotted #f55a76;
    }

    &:focus:active {
      outline: none;
    }
  }
`;
