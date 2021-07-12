import { useMemo, useState } from 'react';

<<<<<<< HEAD:src/components/restaurants.js
import Menu from './menu';
import Tabs from './tabs';
import Reviews from './reviews';
import Restaurant from './restaurant';
=======
import Restaurant from '../restaurant';
import Tabs from '../tabs';
>>>>>>> master:src/components/restaurants/restaurants.js

export default function Restaurants({ restaurants }) {
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
