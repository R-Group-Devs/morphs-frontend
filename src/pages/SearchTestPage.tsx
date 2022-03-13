import { useRef, useState } from "react";
import { useQuery } from "react-query"
import { Link } from "react-router-dom";
import useChainId from "../hooks/useChainId";
import { searchMorphs } from "../lib/search";

export default () => {
  const chainId = useChainId();
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const nextCursor = useRef<string | undefined>(undefined);

  const query = useQuery(['search', chainId, cursor], async () => {
    // w/o any filter arguments, search the entire catalog
    // const resp = await searchMorphs({ cursor });
    const resp = await searchMorphs({ sigils: ['Reaper', 'REAPER'], cursor });
    console.log(resp);
    return resp;
  });

  nextCursor.current = query.data?.nextCursor;

  if (!query.data) {
    return null;
  }

  return <div>
    <button onClick={() => setCursor(nextCursor.current)}>next</button>
    <div>
      {query.data.morphs.map(morph => <div>
        <Link to={`/token/${morph.tokenId}`}>
          {morph.tokenId} - {morph.name}
        </Link>
      </div>)}
    </div>
  </div>

}
