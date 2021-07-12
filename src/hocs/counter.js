import useAmount from '../hooks/use-amount';

export default (WrappedComponent) => (props) => {
  const { initialCount } = props;
  const amountProps = useAmount(initialCount || 0);
  return <WrappedComponent {...props} {...amountProps} />;
};
