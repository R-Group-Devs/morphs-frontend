import { FunctionComponent, useRef, useState } from "react";
import { useQuery } from "react-query"
import { Link } from "react-router-dom";
import useChainId from "../hooks/useChainId";
import { getLoaders } from "../lib/dataloaders";
import { searchMorphsV2 } from "../lib/search-v2";

const Address: FunctionComponent<{ address: string }> = ({ address }) => {
  const { ensName } = getLoaders(1); // ens always on eth
  const query = useQuery(['resolve ens', address], () => ensName.load(address));
  if (query.isLoading || !query.data) {
    return <>{address}</>
  }

  return <>{query.data}</>
}

const MorphItem: FunctionComponent<{ tokenId: string }> = ({ tokenId }) => {
  const { tokenData } = getLoaders();
  const query = useQuery(['get morph', tokenId], () => tokenData.load(tokenId));
  if (query.isLoading || !query.data) {
    return null;
  }

  return <>#{query.data.tokenId} {query.data.name}, owner=<Address address={query.data.owner} /></>
};

export default () => {
  const chainId = useChainId();
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const nextCursor = useRef<string | undefined>(undefined);

  const query = useQuery(['search', chainId, cursor], async () => {
    const resp = await searchMorphsV2({
      cursor,
      limit: 20,
      // filter: { type: 'sigil', sigils: ['Reaper', 'REAPER'] }
      // filter: { type: 'owner', address: '0x303EeFeDeE1bA8e5d507a55465d946B2fea18583' }
      // filter: { type: 'affinity', affinity: 'mythical' }
      // filter: { type: 'has sigil' }
      // filter: { type: 'signature', signature: BigNumber.from(420) }
      // filter: { type: 'era', era: 'genesis II' }
    });
    return resp;
  });

  nextCursor.current = query.data?.nextCursor;

  if (!query.data) {
    return null;
  }

  const tokenIds = query.data.tokenIds;

  return <div>
    <button onClick={() => setCursor(nextCursor.current)}>{tokenIds.length ? 'next' : 'restart' }</button>
    <div>
      {tokenIds.map(tokenId => <div>
        <Link to={`/token/${tokenId}`}>
          <MorphItem tokenId={tokenId} />
        </Link>
      </div>)}
      {tokenIds.length === 0 && <p>(none)</p>}
    </div>
  </div>

}
