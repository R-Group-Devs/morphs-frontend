import { useAccount } from 'wagmi';
import styled from 'styled-components';
import useChainId from '../hooks/useChainId';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';
import { NFT_EXPLORER_URLS } from '../constants/explorers';
import { COLORS } from '../constants/theme';

interface Props {
  tokenId: number | null;
  isBatchMintEnabled: boolean;
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

export default ({ tokenId, isBatchMintEnabled }: Props) => {
  const [{ data: account }] = useAccount();
  const chainId = useChainId();

  return (
    <span>
      <span>Success! You feel a pulse of strange energy... </span>
      <Link
        href={
          isBatchMintEnabled
            ? `${NFT_EXPLORER_URLS[chainId]}/user/${account?.address}/owned?filter[collections][]=${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`
            : `${NFT_EXPLORER_URLS[chainId]}/token/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}:${tokenId}`
        }
        target="_blank"
        rel="noreferrer"
      >
        See your {isBatchMintEnabled ? 'scrolls' : 'scroll'}
      </Link>
      .
    </span>
  );
};
