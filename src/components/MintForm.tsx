import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { BigNumber, constants } from 'ethers';
import styled, { css, keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as Slider from '@radix-ui/react-slider';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { useSpring, animated } from 'react-spring';
import ConnectWalletModal from './ConnectWalletModal';
import MintScrollModal from './MintScrollModal';
import MintScrollSuccessMessage from './MintScrollSuccessMessage';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
import useMint from '../hooks/useMint';
import useBatchMint from '../hooks/useBatchMint';
import { transactionStates } from '../hooks/useExecuteTransaction';
import scrollExampleImage from '../assets/images/scroll-example.png';
import unlockCustomFlagInputButton from '../assets/images/unlock-custom-flag-input-button.png';
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

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1em;
  background: #2e2e2e;
`;

const CustomFlagInput = styled.input<{ $isEmpty: boolean; $hasError: boolean }>`
  padding: 4px 12px;
  width: 100%;
  min-height: 33px;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: ${({ $isEmpty }) => ($isEmpty ? 400 : 600)};
  line-height: 2em;
  text-align: center;
  color: ${COLORS.white};
  background: #2e2e2e;
  border: ${({ $hasError }) =>
    $hasError ? `1px solid ${COLORS.accent.normal}` : '1px solid transparent'};
  border-radius: 2px;
  caret-color: ${COLORS.white};
  transition: color 0.3s, border-color 0.3s;

  &:focus {
    outline: none;
  }

  &::selection {
    color: ${COLORS.white};
    background: #666;
  }
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
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.white)};
  background: #2e2e2e;
  border: ${({ $hasError }) =>
    $hasError ? `1px solid ${COLORS.accent.normal}` : '1px solid transparent'};
  border-radius: 2px;
  caret-color: ${COLORS.white};
  transition: color 0.3s, border-color 0.3s;

  &:focus {
    outline: none;
  }

  &::selection {
    color: ${COLORS.white};
    background: #666;
  }

  ${({ $isValid }) =>
    $isValid &&
    css`
      color: rgba(255, 255, 255, 0.1);
      background: linear-gradient(to right, ${COLORS.success} 30%, #fff 50%, ${COLORS.success} 70%);
      background-color: ${COLORS.success};
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

const MintFormFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 0.45em 0.5em;
  flex-direction: column;
`;

const HelperText = styled.p`
  position: relative;
  margin: 4px 0 5px;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  text-align: center;
  color: ${COLORS.white};
`;

const BatchMintToggle = styled.a`
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  line-height: 18px;
`;

const SliderRoot = styled(Slider.Root)`
  margin: 1.2em 0 2em;
  position: relative;
  display: flex;
  align-items: center;
  background: #333;
  user-select: none;
  touch-action: none;
  width: 100%;

  &[data-orientation='horizontal']: {
    height: 20px;
  }

  &[data-orientation='vertical'] {
    flex-direction: column;
    width: 20px;
    height: 100px;
  }
`;

const SliderTrack = styled(Slider.Track)`
  background-color: black,
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;

  &[data-orientation="horizontal"] {
    height: 3px;
  }

  &[data-orientation="vertical"] {
    width: 3px;
  }
`;

const SliderRange = styled(Slider.Range)`
  position: absolute;
  background: ${COLORS.white};
  border-radius: 9999px;
  height: 100%;
`;

const SliderThumb = styled(Slider.Thumb)`
  all: unset;
  display: block;
  width: 20px;
  height: 20px;
  background: #fff;
  box-shadow: 0 2px 10px black;
  border-radius: 10px;
  transition: background 0.3s;

  &:hover {
    cursor: grab;
  }
`;

const UnlockCustomFlagInputButton = styled.div<{ $hasError: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  width: 38px;
  height: 38px;
  border: ${({ $hasError }) =>
    $hasError ? `1px solid ${COLORS.accent.normal}` : '1px solid transparent'};
  border-left: none;
  background: ${COLORS.primary.normal};
  transition: all 0.3s;

  &:hover {
    background: ${COLORS.primary.light};
    outline: none;
    cursor: pointer;
  }
`;

const UnlockCustomFlagImage = styled.img<{ $isUnlocked: boolean }>`
  width: 100%;
  transform: rotate(${({ $isUnlocked }) => ($isUnlocked ? '90deg' : '0')});
  transition: transform 0.3s;
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
  const [customFlag, setCustomFlag] = useState('');
  const [isUnlockCustomFlagInputButtonVisible, setIsUnlockCustomFlagInputButtonVisible] = useState(
    false
  );
  const [hasUnlockedCustomFlagInput, setHasUnlockedCustomFlagInput] = useState(false);
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [shouldShowTransactionToast, setShouldShowTransactionToast] = useState(false);
  const [isBatchMintEnabled, setIsBatchMintEnabled] = useState(false);
  const [batchMintQuantity, setBatchMintQuantity] = useState(2);
  const [videoClickCount, setVideoClickCount] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const customFlagInputRef = useRef<HTMLInputElement>(null);
  const [
    { data: singleMintData, state: singleMintState, signer: singleMintSigner },
    mint,
  ] = useMint();
  const [
    { data: batchMintData, state: batchMintState, signer: batchMintSigner },
    batchMint,
  ] = useBatchMint();

  const data = isBatchMintEnabled ? batchMintData : singleMintData;
  const state = isBatchMintEnabled ? batchMintState : singleMintState;
  const signer = isBatchMintEnabled ? batchMintSigner : singleMintSigner;

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

  const isCodeValid = !code || hasUnlockedCustomFlagInput || !!(code && flag !== 0);

  const customFlagNumber = useMemo(() => {
    try {
      return BigNumber.from(customFlag || 0);
    } catch (e) {
      return BigNumber.from(0);
    }
  }, [customFlag]);

  const isCustomFlagValid = useMemo(() => {
    try {
      if (!hasUnlockedCustomFlagInput || customFlag === '') {
        return true;
      }

      if (customFlagNumber.gt(2) && customFlagNumber.lte(constants.MaxUint256)) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }, [customFlag, customFlagNumber, hasUnlockedCustomFlagInput]);

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

  const mintScrolls = useCallback(() => {
    setHasPendingMint(false);
    setIsMintScrollModalOpen(true);
    setHasAttemptedSubmission(false);
    setShouldShowTransactionToast(false);

    if (isBatchMintEnabled) {
      batchMint(batchMintQuantity);
    } else {
      mint(hasUnlockedCustomFlagInput ? customFlagNumber : BigNumber.from(flag));
    }
  }, [
    mint,
    customFlagNumber,
    flag,
    batchMint,
    batchMintQuantity,
    isBatchMintEnabled,
    hasUnlockedCustomFlagInput,
    setIsMintScrollModalOpen,
  ]);

  const unlockCustomFlagInputButtonAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    pause: !isUnlockCustomFlagInputButtonVisible,
    config: {
      duration: 3000,
    },
  });

  useEffect(() => {
    if (wallet.connected && signer && hasPendingMint && isCodeValid) {
      if (!isSupportedNetwork) {
        setHasPendingMint(false);
      } else {
        mintScrolls();
      }
    }
  }, [flag, wallet, signer, hasPendingMint, isCodeValid, isSupportedNetwork, mintScrolls]);

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
      toast.success(
        <MintScrollSuccessMessage tokenId={tokenId} isBatchMintEnabled={isBatchMintEnabled} />
      );
      setShouldShowTransactionToast(false);
    }

    if (state === transactionStates.FAILED && shouldShowTransactionToast) {
      toast.error('There was an error processing your transaction.');
      setShouldShowTransactionToast(false);
    }
  }, [state, shouldShowTransactionToast, tokenId, isBatchMintEnabled]);

  useEffect(() => {
    setCode('');
    setCustomFlag('');
    setHasAttemptedSubmission(false);
  }, [hasUnlockedCustomFlagInput]);

  useEffect(() => {
    setCode('');
    setCustomFlag('');
  }, [isBatchMintEnabled]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsUnlockCustomFlagInputButtonVisible(true), 60000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <ScrollExampleVideo
        src="./videos/scrolls-display.mp4"
        onClick={(e) => {
          e.preventDefault();

          setVideoClickCount((count) => count + 1);

          if (videoClickCount >= 4) {
            setIsUnlockCustomFlagInputButtonVisible(true);
          }
        }}
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

          if (!isCustomFlagValid) {
            customFlagInputRef.current?.focus();

            return false;
          }

          if (!wallet.connected) {
            setHasPendingMint(true);
            setIsConnectWalletModalOpen(true);
          } else {
            mintScrolls();
          }
        }}
      >
        {isBatchMintEnabled ? (
          <SliderRoot
            defaultValue={[batchMintQuantity]}
            min={2}
            max={50}
            step={1}
            onValueChange={(value) => setBatchMintQuantity(value[0])}
            aria-label="Scrolls"
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
        ) : (
          <InputContainer>
            {hasUnlockedCustomFlagInput ? (
              <CustomFlagInput
                placeholder="Inscribe a cosmic signature"
                value={customFlag}
                ref={customFlagInputRef}
                onChange={(e) => {
                  e.preventDefault();
                  setCustomFlag(e.target.value);
                }}
                $isEmpty={customFlag === ''}
                $hasError={!isCustomFlagValid && hasAttemptedSubmission}
                spellCheck={false}
                autoComplete="off"
              />
            ) : (
              <CodeInput
                placeholder="If you have a special code, input it here"
                value={code}
                ref={codeInputRef}
                onChange={(e) => setCode(e.target.value)}
                $hasError={!isCodeValid && hasAttemptedSubmission}
                $isValid={!!code && isCodeValid}
                spellCheck={false}
                autoComplete="off"
              />
            )}

            {isUnlockCustomFlagInputButtonVisible && (
              <animated.div style={unlockCustomFlagInputButtonAnimationProps}>
                <UnlockCustomFlagInputButton
                  onClick={() => {
                    setHasUnlockedCustomFlagInput((toggle) => !toggle);
                  }}
                  $hasError={
                    (hasUnlockedCustomFlagInput && !isCustomFlagValid && hasAttemptedSubmission) ||
                    (!hasUnlockedCustomFlagInput && !isCodeValid && hasAttemptedSubmission)
                  }
                >
                  <UnlockCustomFlagImage
                    src={unlockCustomFlagInputButton}
                    $isUnlocked={hasUnlockedCustomFlagInput}
                    alt=""
                  />
                </UnlockCustomFlagInputButton>
              </animated.div>
            )}
          </InputContainer>
        )}

        {!isCustomFlagValid && hasAttemptedSubmission && (
          <ValidationError>
            This cosmic signature is invalid. Enter a number between 3 and 2^256-1.
          </ValidationError>
        )}

        {!isCodeValid && hasAttemptedSubmission && (
          <ValidationError>
            This code is invalid. Double-check the code you entered or mint without a code.
          </ValidationError>
        )}

        {!wallet.connected || isSupportedNetwork ? (
          <SubmitButton>
            <SubmitButtonText $isVisible={isBatchMintEnabled}>
              {isBatchMintEnabled && `Batch Mint ${batchMintQuantity} Scrolls`}
            </SubmitButtonText>

            <SubmitButtonText
              $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 0}
            >
              {!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 0 && 'Mint a Scroll'}
            </SubmitButtonText>

            <SubmitButtonText
              $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 1}
            >
              {!isBatchMintEnabled &&
                !hasUnlockedCustomFlagInput &&
                flag === 1 &&
                'Mint a Mythical Scroll'}
            </SubmitButtonText>

            <SubmitButtonText
              $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 2}
            >
              {!isBatchMintEnabled &&
                !hasUnlockedCustomFlagInput &&
                flag === 2 &&
                'Mint a Cosmic Scroll'}
            </SubmitButtonText>

            <SubmitButtonText $isVisible={hasUnlockedCustomFlagInput && !isBatchMintEnabled}>
              {hasUnlockedCustomFlagInput &&
                !isBatchMintEnabled &&
                (customFlagNumber.gt(2) ? 'Mint a Celestial Scroll' : 'Mint a Scroll')}
            </SubmitButtonText>
          </SubmitButton>
        ) : (
          <UnsupportedNetworkTooltip isVisible={wallet.connected}>
            <DisabledSubmitButton>
              <SubmitButtonText $isVisible={isBatchMintEnabled}>
                {isBatchMintEnabled &&
                  `Batch Mint ${batchMintQuantity} ${
                    batchMintQuantity === 1 ? 'Scroll' : 'Scrolls'
                  }`}
              </SubmitButtonText>

              <SubmitButtonText
                $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 0}
              >
                {!isBatchMintEnabled &&
                  !hasUnlockedCustomFlagInput &&
                  flag === 0 &&
                  'Mint a Scroll'}
              </SubmitButtonText>

              <SubmitButtonText
                $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 1}
              >
                {!isBatchMintEnabled &&
                  !hasUnlockedCustomFlagInput &&
                  flag === 1 &&
                  'Mint a Mythical Scroll'}
              </SubmitButtonText>

              <SubmitButtonText
                $isVisible={!isBatchMintEnabled && !hasUnlockedCustomFlagInput && flag === 2}
              >
                {!isBatchMintEnabled &&
                  !hasUnlockedCustomFlagInput &&
                  flag === 2 &&
                  'Mint a Cosmic Scroll'}
              </SubmitButtonText>

              <SubmitButtonText $isVisible={hasUnlockedCustomFlagInput && !isBatchMintEnabled}>
                {hasUnlockedCustomFlagInput &&
                  !isBatchMintEnabled &&
                  (customFlagNumber.gt(2) ? 'Mint a Celestial Scroll' : 'Mint a Scroll')}
              </SubmitButtonText>
            </DisabledSubmitButton>
          </UnsupportedNetworkTooltip>
        )}
      </form>

      <MintFormFooter>
        {isBatchMintEnabled ? (
          <HelperText>Batch mint cannot be combined with special codes.</HelperText>
        ) : (
          <HelperText>Minting is free. You just pay gas.</HelperText>
        )}

        <BatchMintToggle
          href=""
          onClick={(e) => {
            e.preventDefault();
            setIsBatchMintEnabled((toggle) => !toggle);
          }}
        >
          {isBatchMintEnabled ? 'Single Mint' : 'Batch Mint'}
        </BatchMintToggle>
      </MintFormFooter>

      <Dialog.Root open={isConnectWalletModalOpen}>
        <ConnectWalletModal
          isOpen={isConnectWalletModalOpen}
          close={() => setIsConnectWalletModalOpen(false)}
        />
      </Dialog.Root>

      <Dialog.Root open={isMintScrollModalOpen}>
        <MintScrollModal
          data={data}
          state={state}
          isBatchMintEnabled={isBatchMintEnabled}
          close={() => setIsMintScrollModalOpen(false)}
        />
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
              primary: COLORS.success,
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
