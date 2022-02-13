import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import styled, { css, keyframes } from 'styled-components';
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

const shimmer = keyframes`
  0% {
    background-position: 40% 0;
  }

  100% {
    background-position: top right;
  }
`;

const CodeInputContainer = styled.div`
  margin-bottom: 1em;
  background: #2e2e2e;
`;

const CodeInput = styled.input<{ $isValid: boolean; $hasError: boolean }>`
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
  caret-color: ${COLORS.white};
  transition: color 0.3s, border-color 0.3s;

  &:focus {
    outline: none;
  }

  ${({ $isValid }) =>
    $isValid &&
    css`
      color: rgba(255, 255, 255, 0.1);
      background: linear-gradient(to right, #66ba62 30%, #fff 50%, #66ba62 70%);
      background-color: #66ba62;
      background-size: 100px 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-clip: text;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      animation-name: ${shimmer};
      animation-duration: 2s;
      animation-iteration-count: 1;
    `}
`;

const SubmitButtonStyles = css`
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

  &:hover {
    background: ${COLORS.primary.light};
    color: #fff;
    outline: none;
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const SubmitButton = styled.button`
  ${SubmitButtonStyles}
`;

const DisabledSubmitButton = styled.div`
  ${SubmitButtonStyles}

  &:hover {
    cursor: default;
  }
`;

const SubmitButtonText = styled.span<{ $isVisible: boolean }>`
  transform: ${({ $isVisible }) => ($isVisible ? 'scaleX(1)' : 'scaleX(0)')};
  display: inline-block;
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
        <CodeInputContainer>
          <CodeInput
            placeholder="If you have a special code, input it here"
            ref={codeInputRef}
            onChange={(e) => setCode(e.target.value)}
            $hasError={!isCodeValid && hasAttemptedSubmission}
            $isValid={!!code && isCodeValid}
            spellCheck={false}
            autoComplete="off"
          />
        </CodeInputContainer>

        {!isCodeValid && hasAttemptedSubmission && (
          <ValidationError>
            This code is invalid. Please double-check the code you entered or mint without a code.
          </ValidationError>
        )}

        {!wallet.connected || isSupportedNetwork ? (
          <SubmitButton>
            <SubmitButtonText $isVisible={flag === 0}>
              {flag === 0 && 'Mint a Scroll'}
            </SubmitButtonText>

            <SubmitButtonText $isVisible={flag === 1}>
              {flag === 1 && 'Mint a Mythical Scroll'}
            </SubmitButtonText>

            <SubmitButtonText $isVisible={flag === 2}>
              {flag === 2 && 'Mint a Cosmic Scroll'}
            </SubmitButtonText>
          </SubmitButton>
        ) : (
          <UnsupportedNetworkTooltip isVisible={wallet.connected}>
            <DisabledSubmitButton>Mint a Scroll</DisabledSubmitButton>
          </UnsupportedNetworkTooltip>
        )}
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
            maxWidth: 550,
            fontSize: 12,
            color: COLORS.white,
            background: '#444',
          },
          success: {
            iconTheme: {
              primary: '#66ba62',
              secondary: '#fff',
            },
          },
          error: {
            duration: 8000,
            iconTheme: {
              primary: COLORS.accent.normal,
              secondary: '#fff',
            },
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
