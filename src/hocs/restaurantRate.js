import useAverage from '../hooks/use-average';

export default (WrappedComponent) => (props) => {
    const averageRate = useAverage(props.restaurant.reviews).average;
    return <WrappedComponent {...props} restaurantRate={averageRate} />;
};