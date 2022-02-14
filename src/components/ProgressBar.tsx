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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressTimeout = setTimeout(() => setProgress(100), 500);
    const hideTimeout = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <ProgressBar value={66}>
      <Indicator style={{ width: `${progress}%` }} />
    </ProgressBar>
  );
};
