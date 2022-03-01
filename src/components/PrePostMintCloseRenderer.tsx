import Countdown, { CountdownRenderProps } from 'react-countdown';

interface Props {
  children: (renderProps: CountdownRenderProps) => React.ReactNode;
}

export default ({ children }: Props) => {
  const endDate = new Date(Date.UTC(2022, 2, 1, 6, 0, 0));
  const renderer = (props: CountdownRenderProps) => children(props);

  return <Countdown date={endDate} renderer={renderer} />;
};
