import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import MorphDetails from '../components/MorphDetails';

export default () => {
  const { tokenId = '' } = useParams();

  return (
    <>
      <Suspense fallback="Loading...">
        <MorphDetails tokenId={tokenId} />
      </Suspense>
    </>
  );
};
