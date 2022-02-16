import { useNetwork } from 'wagmi';
import styled, { keyframes } from 'styled-components';
import * as Tooltip from '@radix-ui/react-tooltip';
import { NETWORKS } from '../constants/networks';

interface Props {
  isVisible?: boolean;
  isContentVisible?: boolean;
  children: React.ReactNode;
}

const TooltipTrigger = styled(Tooltip.Trigger)`
  padding: 0;
  width: 100%;
  background: none;
  border: none;
`;

const scaleInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const TooltipContent = styled(Tooltip.Content)<{ $isVisible: boolean }>`
  padding: 0.25em 1.5em;
  display: ${({ $isVisible }) => ($isVisible ? 'inherit' : 'none')};
  font-size: 12px;
  background: #444;
  border-radius: 2px;
  animation: ${scaleInAnimation} 0.1s ease-out;
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: #444;
`;

export default ({ isVisible = true, isContentVisible = true, children, ...rest }: Props) => {
  const [{ data: network }] = useNetwork();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={20}>
        {isContentVisible && (
          <TooltipTrigger
            {...rest}
            onMouseDown={(e) => {
              if (isVisible && !isSupportedNetwork) {
                e.preventDefault();
              }
            }}
            onClick={(e) => {
              if (isVisible && !isSupportedNetwork) {
                e.preventDefault();
              }
            }}
          >
            {children}
          </TooltipTrigger>
        )}

        <TooltipContent sideOffset={5} $isVisible={isVisible && !isSupportedNetwork}>
          <TooltipArrow />
          <p>This app only supports the Ethereum network.</p>
        </TooltipContent>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
