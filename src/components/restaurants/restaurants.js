import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(Object.values(restaurants)[0].id);

  const tabs = useMemo(
    () => Object.values(restaurants).map(({ id, name }) => ({ id, label: name })),
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
  restaurants: PropTypes.object/*arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  )*/.isRequired,
};

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
