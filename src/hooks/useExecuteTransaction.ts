import { useState, useCallback } from 'react';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers';
import { ValueOf } from 'ts-essentials';

export const transactionStates = {
  IDLE: 'idle',
  AWAITING_SIGNATURE: 'awaitingSignature',
  AWAITING_CONFIRMATION: 'awaitingConfirmation',
  CONFIRMED: 'confirmed',
} as const;

export interface Transaction {
  data: TransactionReceipt | null;
  error: Error | null;
  state: ValueOf<typeof transactionStates>;
}

export default () => {
  const [state, setState] = useState<Transaction>({
    data: null,
    state: transactionStates.IDLE,
    error: null,
  });

  const executeTransaction = useCallback(async (method: () => Promise<TransactionResponse>) => {
    try {
      setState((state) => ({ ...state, state: transactionStates.AWAITING_SIGNATURE }));

      const tx = await method();
      setState((state) => ({ ...state, state: transactionStates.AWAITING_CONFIRMATION }));

      const confirmedTx = await tx.wait(1);
      setState((state) => ({ ...state, data: confirmedTx, state: transactionStates.CONFIRMED }));

      return confirmedTx;
    } catch (e) {
      setState((state) => ({
        ...state,
        state: transactionStates.IDLE,
        error: e as Error,
      }));
    }
  }, []);

  return [state, executeTransaction] as const;
};
