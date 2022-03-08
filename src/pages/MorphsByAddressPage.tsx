import { useMemo, Suspense, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import { useEnsLookup, useEnsAvatar, useEnsResolveName } from 'wagmi';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import countBy from 'lodash/countBy';
import makeBlockie from 'ethereum-blockies-base64';
import LoadingIndicator from '../components/LoadingIndicator';
import GalleryItem from '../components/GalleryItem';
import useMorphsByAddress from '../hooks/useMorphsByAddress';
import { shortenAddress } from '../utils/address';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  addressOrName: string;
}

const AFFINITIES = ['Citizen', 'Mythical', 'Cosmic', 'Celestial'];

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

const ProfileName = styled.h2`
  margin-bottom: 0;
  font-family: ${FONTS.sansSerif};
  font-size: 32px;
`;

const AffinityCounts = styled.h4`
  font-size: 14px;
  font-weight: 400;
`;

const AffinityDivider = styled.span`
  color: ${lighten(0.2, COLORS.black)};
`;

const Empty = styled.div`
  margin-top: 6em;
  text-align: center;
`;

const MorphsByAddress = ({ addressOrName }: Props) => {
  const isAccountPropEnsName = addressOrName.endsWith('.eth');

  const [{ data: ens, loading: isLoadingReverseEnsResolution }] = useEnsLookup({
    address: addressOrName,
    skip: isAccountPropEnsName,
  });

  const [{ data: account, loading: isLoadingEnsResolution }] = useEnsResolveName({
    name: addressOrName,
    skip: !isAccountPropEnsName,
  });

  const [{ data: avatar }] = useEnsAvatar({
    addressOrName: isAccountPropEnsName ? addressOrName : ens,
  });

  const address = isAccountPropEnsName ? account || '' : addressOrName;
  const { data: morphs } = useMorphsByAddress(address);

  const affinities = useMemo(() => {
    const counts = countBy(morphs, (x) => x.attributes.affinity);

    return Object.entries(counts)
      .map(([affinity, count]) => ({
        affinity,
        count,
      }))
      .sort((a, b) => AFFINITIES.indexOf(a.affinity) - AFFINITIES.indexOf(b.affinity));
  }, [morphs]);

  const profileName = useMemo(() => {
    if (isAccountPropEnsName) {
      return addressOrName;
    }

    if (isLoadingReverseEnsResolution) {
      return '--';
    }

    return ens ?? shortenAddress(address);
  }, [address, addressOrName, ens, isAccountPropEnsName, isLoadingReverseEnsResolution]);

  const avatarImage = avatar ?? makeBlockie(address || addressOrName);

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    pause: isLoadingEnsResolution || isLoadingReverseEnsResolution,
  });

  if (isLoadingEnsResolution || isLoadingReverseEnsResolution) {
    throw new Promise(() => {});
  }

  return (
    <animated.div style={mountAnimationProps}>
      <Header>
        <Avatar src={avatarImage} />
        <ProfileName>{profileName}</ProfileName>
        <AffinityCounts>
          {affinities.map(({ affinity, count }, index) => (
            <Fragment key={affinity}>
              {index !== 0 && <AffinityDivider> | </AffinityDivider>}
              <strong>{affinity}</strong>: {count}
            </Fragment>
          ))}
        </AffinityCounts>
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

export default () => {
  const { addressOrName } = useParams();

  return (
    <>
      <Helmet>
        <title>{addressOrName}</title>
      </Helmet>

      <Suspense fallback={<LoadingIndicator />}>
        <MorphsByAddress addressOrName={addressOrName || ''} />
      </Suspense>
    </>
  );
};
