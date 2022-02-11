import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import {
  PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES,
  MORPHS_NFT_CONTRACT_ADDRESSES,
} from '../constants/contracts';
import { NFT_EXPLORER_URLS } from '../constants/explorers';
import { COLORS } from '../constants/theme';

interface Props {
  tokenId: number | null;
}

const Link = styled.a`
  color: ${COLORS.white} !important;
  font-weight: 600;
  border-bottom-color: ${COLORS.white} !important;

  &:focus {
    outline-color: ${COLORS.white} !important;
  }
`;

export default ({ tokenId }: Props) => {
  const [{ data: network }] = useNetwork();

  const chainId =
    network?.chain?.id && network?.chain?.id in PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES
      ? network?.chain?.id
      : // TODO: use mainnet fallback
        4;

  return (
    <span>
      <span>Your scroll has been minted! See it </span>
      <Link
        href={
          tokenId
            ? `${NFT_EXPLORER_URLS[chainId]}/token/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}:${tokenId}`
            : `${NFT_EXPLORER_URLS[chainId]}/collection/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`
        }
        target="_blank"
        rel="noreferrer"
      >
        here
      </Link>
      .
    </span>
  );
};
