import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';

import {
  activeRestaurantIdSelector,
  restaurantsListSelector,
  changeRestaurant,
  loadRestaurants,
  restaurantsLoadingSelector,
} from '../../redux/features/restaurants';
import { loadProducts } from '../../redux/features/products';

function Restaurants({
  activeId,
  restaurants,
  loading,
  loadProducts,
  changeRestaurant,
  loadRestaurants,
}) {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  if (loading) return <Loader />;

  return (
    <div>
      <Tabs tabs={tabs} onChange={(newId) => {loadProducts(newId); changeRestaurant(newId);}} activeId={activeId} />
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
  loading: restaurantsLoadingSelector(state),
});

const mapDispatchToProps = {
      loadProducts,
      changeRestaurant,
      loadRestaurants,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
