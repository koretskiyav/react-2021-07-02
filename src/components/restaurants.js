import { useMemo, useState } from 'react';

import Tabs from './tabs';
import Restaurant from './restaurant';

export default function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(restaurants[0].id);

  console.log(activeId);

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
      <Tabs tabs={tabs} onChange={setActiveId} />
      <Restaurant
        menu={activeRestaurant.menu}
        reviews={activeRestaurant.reviews}
      />
    </div>
  );
}
