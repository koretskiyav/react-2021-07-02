import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Loader from '../loader';

import {
  restaurantsListSelector,
  loadRestaurants,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

import styles from './restaurants.module.css';

function Restaurants({ restaurants, loaded, loadRestaurants, match, history }) {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  if (!loaded) return <Loader />;

  // console.log(match);

  const { restId } = match.params;

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`/restaurants/${id}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <Restaurant id={restId} />
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
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
});

const mapDispatchToProps = {
  loadRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
