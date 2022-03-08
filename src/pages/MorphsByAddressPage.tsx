import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import MorphsByAddressGallery from '../components/MorphsByAddressGallery';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
  const { account } = useParams();

  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <MorphsByAddressGallery account={account || ''} />
      </Suspense>
    </>
  );
};
