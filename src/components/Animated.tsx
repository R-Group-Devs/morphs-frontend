import { useSpring, animated } from 'react-spring';

interface Props {
  children: React.ReactNode;
  pause?: boolean;
}

export default ({ children, pause = false }: Props) => {
  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    pause,
  });

  return <animated.div style={mountAnimationProps}>{children}</animated.div>;
};
