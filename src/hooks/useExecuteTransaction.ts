import { useState, useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';

export const transactionStates = {
  IDLE: 'idle',
  AWAITING_SIGNATURE: 'awaitingSignature',
  AWAITING_CONFIRMATION: 'awaitingConfirmation',
  CONFIRMED: 'confirmed',
};

export interface Transaction {
  data: TransactionResponse;
  error: Error;
  state: keyof typeof transactionStates;
}

export default () => {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState(transactionStates.IDLE);

  const executeTransaction = useCallback(async (method: () => Promise<TransactionResponse>) => {
    try {
      setState(transactionStates.AWAITING_SIGNATURE);

      const tx = await method();

      setState(transactionStates.AWAITING_CONFIRMATION);
      setData(tx);

      await tx.wait(1);
      setState(transactionStates.CONFIRMED);

      return tx;
    } catch (e) {
      setError(e as Error);
      setState(transactionStates.IDLE);
    }
  }, []);

  return [{ data, state, error }, executeTransaction] as [Transaction, typeof executeTransaction];
};
