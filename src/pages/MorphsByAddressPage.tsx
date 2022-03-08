import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import MorphsByAddressGallery from '../components/MorphsByAddressGallery';

export default () => {
  const { account } = useParams();

  return (
    <>
      <Suspense fallback="Loading...">
        <MorphsByAddressGallery account={account || ''} />
      </Suspense>
    </>
  );
};
