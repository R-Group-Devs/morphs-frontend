import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import Input from './Input';
import UpdateSigilModal from './UpdateSigilModal';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
import ValidationError from './ValidationError';
import useUpdateSigil from '../hooks/useUpdateSigil';
import { transactionStates } from '../hooks/useExecuteTransaction';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  isVisible: boolean;
  onUpdate: () => void;
}

const Container = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: all 0.3s;
`;

const Form = styled.form`
  display: flex;
  margin-top: 1em;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-family: ${FONTS.sansSerif};
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: ${COLORS.white};
  background: ${COLORS.primary.normal};
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

const NetworkTooltip = styled(UnsupportedNetworkTooltip)`
  width: auto;
`;

export default ({ isVisible, onUpdate }: Props) => {
  const { tokenId } = useParams();
  const [sigil, setSigil] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [{ data, state }, updateSigil] = useUpdateSigil();
  const inputRef = useRef<HTMLInputElement>(null);

  const isSigilValid = sigil && sigil.length <= 8;

  useEffect(() => {
    if (state === transactionStates.CONFIRMED) {
      onUpdate();
      setHasAttemptedSubmission(false);
      setSigil('');
    }
  }, [state, onUpdate]);

  return (
    <Container $isVisible={isVisible}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setHasAttemptedSubmission(true);

          if (!isSigilValid) {
            inputRef.current?.focus();

            return false;
          }

          if (tokenId && sigil) {
            updateSigil(tokenId, sigil);
            setIsModalOpen(true);
          }
        }}
      >
        <Input
          placeholder="Enter a sigil"
          ref={inputRef}
          value={sigil}
          onChange={(e) => setSigil(e.target.value)}
          $hasError={!isSigilValid && hasAttemptedSubmission}
          spellCheck={false}
          autoComplete="off"
        />

        <NetworkTooltip>
          <SubmitButton>Align</SubmitButton>
        </NetworkTooltip>
      </Form>

      {!isSigilValid && hasAttemptedSubmission && (
        <ValidationError>Sigil must be between 1-8 characters long.</ValidationError>
      )}

      <Dialog.Root open={isModalOpen}>
        <UpdateSigilModal data={data} state={state} close={() => setIsModalOpen(false)} />
      </Dialog.Root>
    </Container>
  );
};
