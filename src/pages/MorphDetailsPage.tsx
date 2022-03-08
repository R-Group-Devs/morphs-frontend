import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MorphDetails from '../components/MorphDetails';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
  const { tokenId = '' } = useParams();

  return (
    <>
      <Helmet>
        <title>{tokenId}</title>
      </Helmet>

      <Suspense fallback={<LoadingIndicator />}>
        <MorphDetails tokenId={tokenId} />
      </Suspense>
    </>
  );
};
