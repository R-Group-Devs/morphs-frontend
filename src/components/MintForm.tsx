import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import ConnectWalletModal from './ConnectWalletModal';
import MintScrollModal from './MintScrollModal';
import MintScrollSuccessMessage from './MintScrollSuccessMessage';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
import useMint from '../hooks/useMint';
import { transactionStates } from '../hooks/useExecuteTransaction';
import scrollExampleImage from '../assets/images/scroll-example.png';
import { NETWORKS } from '../constants/networks';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  margin-left: 22%;
  width: 100%;

  @media (max-width: 767px) {
    margin-top: 3em;
    margin-left: 0;
  }
`;

const ScrollExampleVideo = styled.video`
  margin-top: -0.5em;
  margin-bottom: 1.75em;
  width: 100%;
  height: auto;
  border: 1px solid ${COLORS.white};
`;

const CodeInput = styled.input<{ $isValid: boolean; $hasError: boolean }>`
  margin-bottom: 1em;
  padding: 4px 12px;
  width: 100%;
  min-height: 33px;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: ${({ $isValid }) => ($isValid ? 600 : 'normal')};
  line-height: 2em;
  text-align: center;
  color: ${({ $isValid }) => ($isValid ? '#66ba62' : COLORS.white)};
  background: #2e2e2e;
  border: ${({ $hasError }) =>
    $hasError ? `1px solid ${COLORS.accent.normal}` : '1px solid transparent'};
  border-radius: 2px;
  transition: all 0.3s;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button<{ $isDisabled: boolean }>`
  padding: 20px 50px;
  width: 100%;
  min-height: 72px;
  background: ${COLORS.primary.normal};
  font-family: ${FONTS.sansSerif};
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: ${COLORS.white};
  border: none;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: ${COLORS.primary.light};
    color: #fff;
    outline: none;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const HelperText = styled.p`
  margin-top: 0.5em;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
  color: ${COLORS.white};
`;

const ValidationError = styled.div`
  margin-bottom: 1.5em;
  font-size: 12px;
  color: ${COLORS.accent.normal};
`;

const ToastDismissButton = styled.button`
  font-family: ${FONTS.sansSerif};
  font-weight: 600;
  color: ${COLORS.white};
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const MYTHICAL_CODE = 'MYTHICAL69';
const COSMIC_CODE = 'COSMIC420';

export default () => {
  const [{ data: network }] = useNetwork();
  const [{ data: wallet }] = useConnect();
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const [isMintScrollModalOpen, setIsMintScrollModalOpen] = useState(false);
  const [hasPendingMint, setHasPendingMint] = useState(false);
  const [code, setCode] = useState('');
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [shouldShowTransactionToast, setShouldShowTransactionToast] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [{ data, state, signer }, mint] = useMint();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const flag = useMemo(() => {
    const sanitizedCode = code.toUpperCase().trim();

    if (sanitizedCode === MYTHICAL_CODE) {
      return 1;
    }

    if (sanitizedCode === COSMIC_CODE) {
      return 2;
    }

    return 0;
  }, [code]);

  const isCodeValid = !code || !!(code && flag !== 0);

  const tokenId = useMemo(() => {
    if (
      state === transactionStates.CONFIRMED &&
      data?.logs &&
      data.logs[0]?.topics &&
      data.logs[0]?.topics[3]
    ) {
      return parseInt(data.logs[0].topics[3]);
    }

    return null;
  }, [data, state]);

  const mintScroll = useCallback(() => {
    setHasPendingMint(false);
    setIsMintScrollModalOpen(true);
    setHasAttemptedSubmission(false);
    setShouldShowTransactionToast(false);
    mint(flag);
  }, [mint, flag, setIsMintScrollModalOpen]);

  useEffect(() => {
    if (wallet.connected && signer && hasPendingMint && isCodeValid) {
      mintScroll();
    }
  }, [flag, wallet, signer, isCodeValid, hasPendingMint, mintScroll]);

  useEffect(() => {
    if (
      !isMintScrollModalOpen &&
      (state === transactionStates.AWAITING_SIGNATURE ||
        state === transactionStates.AWAITING_CONFIRMATION)
    ) {
      setShouldShowTransactionToast(true);
    }
  }, [isMintScrollModalOpen, state]);

  useEffect(() => {
    if (state === transactionStates.CONFIRMED && shouldShowTransactionToast) {
      toast.success(<MintScrollSuccessMessage tokenId={tokenId} />);
      setShouldShowTransactionToast(false);
    }

    if (state === transactionStates.FAILED && shouldShowTransactionToast) {
      toast.error('There was an error processing your transaction.');
      setShouldShowTransactionToast(false);
    }
  }, [state, shouldShowTransactionToast, tokenId]);

  return (
    <Container>
      <ScrollExampleVideo
        src="./videos/scrolls-display.mp4"
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload"
        poster={scrollExampleImage}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          setHasAttemptedSubmission(true);

          if (!isCodeValid) {
            codeInputRef.current?.focus();

            return false;
          }

          if (!wallet.connected) {
            setHasPendingMint(true);
            setIsConnectWalletModalOpen(true);
          } else {
            mintScroll();
          }
        }}
      >
        <CodeInput
          placeholder="If you have a special code, input it here"
          ref={codeInputRef}
          onChange={(e) => setCode(e.target.value)}
          $hasError={!isCodeValid && hasAttemptedSubmission}
          $isValid={!!code && isCodeValid}
          spellCheck={false}
          autoComplete="off"
        />

        {!isCodeValid && hasAttemptedSubmission && (
          <ValidationError>
            This code is invalid. Please double-check the code you entered or mint without a code.
          </ValidationError>
        )}

        <UnsupportedNetworkTooltip isVisible={wallet.connected}>
          <SubmitButton $isDisabled={wallet.connected && !isSupportedNetwork}>
            Mint a Scroll
          </SubmitButton>
        </UnsupportedNetworkTooltip>
      </form>

      <HelperText>Minting is free. You just pay gas.</HelperText>

      <Dialog.Root open={isConnectWalletModalOpen}>
        <ConnectWalletModal close={() => setIsConnectWalletModalOpen(false)} />
      </Dialog.Root>

      <Dialog.Root open={isMintScrollModalOpen}>
        <MintScrollModal data={data} state={state} close={() => setIsMintScrollModalOpen(false)} />
      </Dialog.Root>

      <Toaster
        toastOptions={{
          duration: 60000,
          style: {
            maxWidth: 400,
            fontFamily: FONTS.sansSerif,
            fontSize: 12,
            color: COLORS.white,
            background: '#444',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <ToastDismissButton onClick={() => toast.dismiss(t.id)}>X</ToastDismissButton>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </Container>
  );
};
