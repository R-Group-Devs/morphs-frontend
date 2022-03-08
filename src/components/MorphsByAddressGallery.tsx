import styled from 'styled-components';
import useMorphsByAddress from '../hooks/useMorphsByAddress';
import GalleryItem from './GalleryItem';
import { shortenAddress } from '../utils/address';
import { COLORS } from '../constants/theme';

interface Props {
  account: string;
}

const Gallery = styled.ul`
  padding: 0;
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
  list-style: none;
`;

const Header = styled.div`
  margin-bottom: 4em;
  text-align: center;
`;

const Avatar = styled.span`
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px solid ${COLORS.white};
  border-radius: 50%;
`;

const ProfileName = styled.h2``;
const MorphsCount = styled.h3`
  font-size: 14px;
  font-weight: 400;
`;

export default ({ account }: Props) => {
  const { data: morphs } = useMorphsByAddress(account);
  const profileName = shortenAddress(account);

  console.log(morphs);

  return (
    <>
      <Header>
        <Avatar />
        <ProfileName>{profileName}</ProfileName>
        <MorphsCount>{morphs?.length} Morphs</MorphsCount>
      </Header>

      <Gallery>
        {morphs?.map((morph) => (
          <GalleryItem key={morph.tokenId} {...morph} />
        ))}
      </Gallery>
    </>
  );
};
