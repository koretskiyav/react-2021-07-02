import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
>>>>>>> master:src/components/restaurants/restaurants.js

function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(restaurants[0].id);

  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  const activeRestaurant = useMemo(
    () => restaurants.find((restaurant) => restaurant.id === activeId),
    [activeId, restaurants]
  );

  return (
    <div>
<<<<<<< HEAD:src/components/restaurants.js
      <Tabs tabs={tabs} onChange={setActiveId} />
      <Restaurant
        menu={activeRestaurant.menu}
        reviews={activeRestaurant.reviews}
      />
=======
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant restaurant={activeRestaurant} />
>>>>>>> master:src/components/restaurants/restaurants.js
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

export default Restaurants;
