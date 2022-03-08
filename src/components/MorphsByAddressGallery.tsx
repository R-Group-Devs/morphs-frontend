import styled from 'styled-components';
import { useEnsAvatar } from 'wagmi';
import { useSpring, animated } from 'react-spring';
import makeBlockie from 'ethereum-blockies-base64';
import useMorphsByAddress from '../hooks/useMorphsByAddress';
import GalleryItem from './GalleryItem';
import { shortenAddress } from '../utils/address';
import { COLORS } from '../constants/theme';

interface Props {
  account: string;
}

const Gallery = styled.ul`
  margin-bottom: 5em;
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

const Avatar = styled.img`
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

const Empty = styled.div`
  margin-top: 6em;
  text-align: center;
`;

export default ({ account }: Props) => {
  const [{ data: avatar }] = useEnsAvatar({
    addressOrName: account,
  });
  const { data: morphs } = useMorphsByAddress(account);
  const profileName = shortenAddress(account);
  const avatarImage = avatar ?? makeBlockie(account);

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    pause: !morphs,
  });

  return (
    <animated.div style={mountAnimationProps}>
      <Header>
        <Avatar src={avatarImage} />
        <ProfileName>{profileName}</ProfileName>
        <MorphsCount>
          {morphs?.length} {morphs?.length === 1 ? 'Morph' : 'Morphs'}
        </MorphsCount>
      </Header>

      {morphs?.length ? (
        <Gallery>
          {morphs?.map((morph) => (
            <GalleryItem key={morph.tokenId} {...morph} />
          ))}
        </Gallery>
      ) : (
        <Empty>This wallet does not hold any morphs.</Empty>
      )}
    </animated.div>
  );
};
