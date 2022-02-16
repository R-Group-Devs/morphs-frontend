import styled from 'styled-components';
import useChainId from '../hooks/useChainId';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';
import { NFT_EXPLORER_URLS, NFT_COLLECTION_NAMES } from '../constants/explorers';
import { COLORS } from '../constants/theme';

interface Props {
  tokenId: number | null;
}

const Link = styled.a`
  font-weight: 600;
  color: ${COLORS.white};
  border-bottom-color: ${COLORS.white};

  &:hover {
    color: ${COLORS.white};
    border-bottom-color: ${COLORS.white};
  }

  &:focus {
    outline-color: ${COLORS.white};
  }
`;

export default ({ tokenId }: Props) => {
  const chainId = useChainId();

  return (
    <span>
      <span>Success! You feel a pulse of strange energy... </span>
      <Link
        href={
          tokenId
            ? `${NFT_EXPLORER_URLS[chainId]}/assets/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}/${tokenId}`
            : `${NFT_EXPLORER_URLS[chainId]}/collection/${NFT_COLLECTION_NAMES[chainId]}`
        }
        target="_blank"
        rel="noreferrer"
      >
        See your scroll
      </Link>
      .
    </span>
  );
};
