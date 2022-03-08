import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MorphsByAddressGallery from '../components/MorphsByAddressGallery';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
  const { addressOrName } = useParams();

  return (
    <>
      <Helmet>
        <title>{addressOrName}</title>
      </Helmet>

      <Suspense fallback={<LoadingIndicator />}>
        <MorphsByAddressGallery addressOrName={addressOrName || ''} />
      </Suspense>
    </>
  );
};
