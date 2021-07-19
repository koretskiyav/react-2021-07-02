import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantsSelector } from '../../redux/features/restaurants';

function Restaurants({ restaurants, firstRestaurant }) {
  const [activeId, setActiveId] = useState(firstRestaurant);

  const tabs = useMemo(() => {
    return Object.values(restaurants).map(({ id, name }) => ({
      id,
      label: name,
    }));
  }, [restaurants]);

  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant restaurant={restaurants[activeId]} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const restaurants = restaurantsSelector(state);
  const keys = Object.keys(restaurants);
  return {
    restaurants: restaurants,
    firstRestaurant: keys[0],
  };
};

export default connect(mapStateToProps, null)(Restaurants);
