import { useState, useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { ValueOf } from 'ts-essentials';

export const transactionStates = {
  IDLE: 'idle',
  AWAITING_SIGNATURE: 'awaitingSignature',
  AWAITING_CONFIRMATION: 'awaitingConfirmation',
  CONFIRMED: 'confirmed',
} as const;

export interface Transaction {
  data: TransactionResponse | null;
  error: Error | null;
  state: ValueOf<typeof transactionStates>;
}

export default () => {
  const [state, setState] = useState<Transaction>({
    data: null,
    state: transactionStates.IDLE,
    error: null,
  });

  const executeTransaction = useCallback(
    async (method: () => Promise<TransactionResponse>) => {
      try {
        setState({ ...state, state: transactionStates.AWAITING_SIGNATURE });

        const tx = await method();
        setState({ ...state, data: tx, state: transactionStates.AWAITING_CONFIRMATION });

        await tx.wait(1);
        setState({ ...state, state: transactionStates.CONFIRMED });

        return tx;
      } catch (e) {
        setState({
          ...state,
          state: transactionStates.IDLE,
          error: e as Error,
        });
      }
    },
    [state]
  );

  return [state, executeTransaction] as [Transaction, typeof executeTransaction];
};
