import useAmount from '../hooks/use-amount';

export default (WrappedComponent) =>
  ({ initialCount = 0, ...props }) => {
    const amountProps = useAmount(initialCount);
    return <WrappedComponent {...props} {...amountProps} />;
  };
