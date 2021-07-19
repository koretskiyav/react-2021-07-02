import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { allRestaurantsSelector } from './../../redux/selectors';
function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const tabs = useMemo(
    () =>
      Object.keys(restaurants).map((id) => ({
        id: id,
        label: restaurants[id].name,
      })),
    [restaurants]
  );

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant restaurant={activeRestaurant} />
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

export default connect((state) => ({
  restaurants: allRestaurantsSelector(state),
}))(Restaurants);
