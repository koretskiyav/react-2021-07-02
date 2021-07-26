import { useEffect, useMemo, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';
import Button from '../button';
import {
  activeRestaurantIdSelector,
  restaurantsListSelector,
  changeRestaurant,
  loadRestaurants,
  restaurantsLoadedSelector,
  shouldLoadRestaurantsSelector,
} from '../../redux/features/restaurants';
import styles from './restaurant.module.css';
import { currencyContext, currencyEnum } from '../../contexts/currency';
function Restaurants({
  activeId,
  restaurants,
  loaded,
  shouldLoad,
  changeRestaurant,
  loadRestaurants,
}) {
  useEffect(() => {
    if (shouldLoad) loadRestaurants();
  }, [shouldLoad]); // eslint-disable-line
  const { setCurency } = useContext(currencyContext);
  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  if (!loaded) return <Loader />;

  return (
    <div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            setCurency(currencyEnum.USD);
          }}
          data-id="$"
        >
          $
        </Button>
        <Button
          onClick={() => {
            setCurency(currencyEnum.Euro);
          }}
          data-id="Euro"
        >
          &#x20AC;
        </Button>
        <Button
          onClick={() => {
            setCurency(currencyEnum.Uah);
          }}
          data-id="HRN"
        >
          &#x20B4;
        </Button>
      </div>
      <Tabs tabs={tabs} onChange={changeRestaurant} activeId={activeId} />
      <Restaurant id={activeId} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  activeId: activeRestaurantIdSelector(state),
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
  shouldLoad: shouldLoadRestaurantsSelector(state),
});

const mapDispatchToProps = {
  changeRestaurant,
  loadRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
