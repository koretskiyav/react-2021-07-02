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
import {
  loadUsers,
} from '../../redux/features/users';

function Restaurants({
  activeId,
  restaurants,
  loading,
  changeRestaurant,
  loadUsers,
  loadRestaurants,
}) {
  useEffect(() => {
    loadRestaurants();
    loadUsers();
  }, []); // eslint-disable-line

  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  if (loading) return <Loader />;

  return (
    <div>
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
  loading: restaurantsLoadingSelector(state),
});

const mapDispatchToProps = {
  changeRestaurant,
  loadRestaurants,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
