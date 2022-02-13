import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Progress from '@radix-ui/react-progress';
import { COLORS } from '../constants/theme';

const ProgressBar = styled(Progress.Root)`
  position: fixed;
  top: calc(50% - 4px);
  left: calc(50% - 150px);
  width: 300px;
  height: 8px;
  background: none;
  border: 1px solid ${COLORS.white};
  border-radius: 99999px;
  overflow: hidden;
`;

const Indicator = styled(Progress.Indicator)`
  height: 100%;
  background: ${COLORS.white};
  transition: width 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;

export default () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ProgressBar value={66}>
      <Indicator style={{ width: `${progress}%` }} />
    </ProgressBar>
  );
};
