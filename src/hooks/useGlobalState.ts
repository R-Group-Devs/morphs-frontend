import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ isConnectWalletModalOpen: false });

export default useGlobalState;
