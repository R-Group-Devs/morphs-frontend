import { useState, useCallback } from 'react';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers';
import { ValueOf } from 'ts-essentials';

export const transactionStates = {
  IDLE: 'idle',
  AWAITING_SIGNATURE: 'awaitingSignature',
  AWAITING_CONFIRMATION: 'awaitingConfirmation',
  CONFIRMED: 'confirmed',
  FAILED: 'failed',
} as const;

export interface Transaction {
  data: TransactionReceipt | null;
  error: Error | null;
  state: ValueOf<typeof transactionStates>;
}

const initialState = {
  data: null,
  state: transactionStates.IDLE,
  error: null,
} as const;

export default () => {
  const [state, setState] = useState<Transaction>(initialState);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

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
        state: transactionStates.FAILED,
        error: e as Error,
      }));
    }
  }, []);

  return [state, executeTransaction, reset] as const;
};
