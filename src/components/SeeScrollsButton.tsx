import styled, { css } from 'styled-components';
import useChainId from '../hooks/useChainId';
import { NFT_EXPLORER_URLS } from '../constants/explorers';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';
import { COLORS, FONTS } from '../constants/theme';

// TODO: extract into common file
const ButtonStyles = css`
  padding: 20px 50px;
  width: 100%;
  min-height: 72px;
  background: ${COLORS.primary.normal};
  font-family: ${FONTS.sansSerif};
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: ${COLORS.white};
  border: none;
  transition: all 0.3s;

  &:hover {
    background: ${COLORS.primary.light};
    color: #fff;
    outline: none;
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const SeeScrollsButton = styled.a`
  ${ButtonStyles}
  display: block;
  font-size: 20px;
  line-height: 32px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export default () => {
  const chainId = useChainId();

  return (
    <>
      <SeeScrollsButton
        href={`${NFT_EXPLORER_URLS[chainId]}/collection/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`}
        target="_blank"
        rel="noreferrer"
      >
        Browse Scrolls on Rarible →
      </SeeScrollsButton>
    </>
  );
};
