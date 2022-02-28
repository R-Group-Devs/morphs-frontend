interface OnChainMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<{ trait_type: string; value: string }>;
}

/** pull an attribute out of nft metadata */
export const getAttribute = (metadata: OnChainMetadata, key: string): string => {
  const attr = metadata.attributes?.find(a => a.trait_type === key);
  if (attr === undefined) throw new Error(`could not resolve attribute: ${key}`)
  return attr?.value;
}

/** parse the base64 encoded JSON from eg morphs */
export const metadataFromTokenURI = (tokenUri: string): OnChainMetadata => {
  const [prefix, encoded] = tokenUri.split(",");
  if (prefix !== "data:application/json;base64") throw new Error("invalid token uri");
  const json = Buffer.from(encoded, "base64").toString();
  const parsed = JSON.parse(json);
  return parsed;
};

export const rewriteIpfsUri = (uri: string): string => {
  return uri.replace('ipfs://ipfs/', 'https://ipfs.heyshell.xyz/ipfs/');
}
