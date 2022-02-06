import { useState, useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';

export const TRANSACTION_STATES = {
  IDLE: 'idle',
  AWAITING_SIGNATURE: 'awaitingSignature',
  AWAITING_CONFIRMATION: 'awaitingConfirmation',
  CONFIRMED: 'confirmed',
};

export interface Transaction {
  data: TransactionResponse;
  error: Error;
  state: keyof typeof TRANSACTION_STATES;
}

export default () => {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState(TRANSACTION_STATES.IDLE);

  const executeTransaction = useCallback(async (method: () => Promise<TransactionResponse>) => {
    try {
      setState(TRANSACTION_STATES.AWAITING_SIGNATURE);

      const tx = await method();

      setState(TRANSACTION_STATES.AWAITING_CONFIRMATION);
      setData(tx);

      await tx.wait(1);
      setState(TRANSACTION_STATES.CONFIRMED);

      return data;
    } catch (e) {
      const error = <Error>e;
      setError(error);
      setState(TRANSACTION_STATES.IDLE);
    }
  }, []);

  return [{ data, state, error }, executeTransaction] as [Transaction, typeof executeTransaction];
};
