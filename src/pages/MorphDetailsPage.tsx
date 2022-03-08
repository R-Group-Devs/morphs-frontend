import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import MorphDetails from '../components/MorphDetails';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
  const { tokenId = '' } = useParams();

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <MorphDetails tokenId={tokenId} />
    </Suspense>
  );
};
