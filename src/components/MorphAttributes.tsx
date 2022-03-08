import { useState, useMemo, MouseEventHandler } from 'react';
import { BigNumber } from 'ethers';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import useGlobalKeyDown from 'react-global-key-down-hook';
import * as Tooltip from './Tooltip';
import { MorphsMetadata } from '../lib/morphs';
import { shortenAddress } from '../utils/address';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  isSigilFormVisible: boolean;
  onSigilMouseEnter: MouseEventHandler<HTMLElement>;
  onSigilMouseLeave: MouseEventHandler<HTMLElement>;
}

const Container = styled.ul`
  padding: 0;
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
  list-style: none;
`;

const Attribute = styled.li`
  display: flex;
  flex-direction: column;
  flex: 0 1 calc(33.333333% - 1em);
  align-items: center;
  justify-content: center;
  padding: 1em;
  text-align: center;
  border: 1px solid ${lighten(0.1, COLORS.black)};

  @media (max-width: 580px) {
    flex: 0 1 calc(50% - 0.75em);
  }

  @media (max-width: 440px) {
    flex: 0 1 100%;
  }
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.5em;
  font-family: ${FONTS.sansSerif};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Value = styled.span`
  display: block;
`;

export default ({
  affinity,
  era,
  group,
  palette,
  quantumStatus,
  sigil,
  signature,
  variation,
  isSigilFormVisible,
  onSigilMouseEnter,
  onSigilMouseLeave,
}: MorphsMetadata['attributes'] & Props) => {
  const [isSigilFormPersisted, setIsSigilFormPersisted] = useState(false);
  const isEntangled = quantumStatus === 'Entangled';

  const computedSignature = useMemo(() => {
    if (isEntangled) {
      return BigNumber.from(signature).toHexString();
    }

    return signature.length > 10 ? `${signature.slice(0, 10)}...` : signature;
  }, [signature, isEntangled]);

  useGlobalKeyDown(() => {
    if (isSigilFormVisible) {
      setIsSigilFormPersisted(true);
    }
  }, 'Shift');

  return (
    <Container>
      <Attribute>
        <Label>Affinity</Label>
        <Value>{affinity}</Value>
      </Attribute>

      <Attribute>
        <Label>Era</Label>
        <Value>{era}</Value>
      </Attribute>

      <Attribute>
        <Label>Group</Label>
        <Value>{group}</Value>
      </Attribute>

      <Attribute>
        <Label>Palette</Label>
        <Value>{palette}</Value>
      </Attribute>

      <Attribute>
        <Label>Quantum Status</Label>
        <Value>{quantumStatus}</Value>
      </Attribute>

      <Attribute
        onMouseEnter={onSigilMouseEnter}
        onMouseLeave={(e) => !isSigilFormPersisted && onSigilMouseLeave(e)}
      >
        <Label>Sigil</Label>
        <Value>{sigil}</Value>
      </Attribute>

      <Attribute>
        <Label>Signature</Label>
        {isEntangled ? (
          <Link to={`/address/${computedSignature}`}>{shortenAddress(computedSignature)}</Link>
        ) : (
          <>
            {signature.length > 10 ? (
              <Tooltip.Provider>
                <Tooltip.Root delayDuration={20}>
                  <Tooltip.Trigger>
                    <Value>{computedSignature}</Value>
                  </Tooltip.Trigger>

                  <Tooltip.Content sideOffset={5}>
                    <Tooltip.Arrow />
                    <p>{signature}</p>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              computedSignature
            )}
          </>
        )}
      </Attribute>

      <Attribute>
        <Label>Variation</Label>
        <Value>{variation}</Value>
      </Attribute>
    </Container>
  );
};
