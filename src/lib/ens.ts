import { Contract } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { RPC_URLS } from '../constants/rpc';

// https://github.com/ensdomains/reverse-records
const reverseRecordsAddress = '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C';
const ReverseRecords = ['function getNames(address[]) view returns (string[] memory)']

/** resolve an array of addresses into ENS names */
export const batchResolveEnsNames = async (addresses: string[]): Promise<(string | undefined)[]> => {
  const provider = new StaticJsonRpcProvider(RPC_URLS[1]);
  const rr = new Contract(reverseRecordsAddress, ReverseRecords, provider);
  const names: string[] = await rr['getNames(address[])'](addresses);
  const projected = names.map((n) => (n ? n : undefined));
  return projected;
};
