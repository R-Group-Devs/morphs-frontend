import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import MorphsByAddressGallery from '../components/MorphsByAddressGallery';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
  const { addressOrName } = useParams();

  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <MorphsByAddressGallery addressOrName={addressOrName || ''} />
      </Suspense>
    </>
  );
};
