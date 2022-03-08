import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import * as Tooltip from './Tooltip';
import { NETWORKS } from '../constants/networks';

interface Props {
  isVisible?: boolean;
  isContentVisible?: boolean;
  children: React.ReactNode;
}

const Content = styled(Tooltip.Content)<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'inherit' : 'none')};
`;

export default ({ isVisible = true, isContentVisible = true, children, ...rest }: Props) => {
  const [{ data: network }] = useNetwork();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={20}>
        {isContentVisible && (
          <Tooltip.Trigger
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
          </Tooltip.Trigger>
        )}

        <Content sideOffset={5} $isVisible={isVisible && !isSupportedNetwork}>
          <Tooltip.Arrow />
          <p>This app only supports the Ethereum network.</p>
        </Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
