import { useMemo, useState } from 'react';

import Menu from './menu';
import Reviews from './review/review-list/reviews';
import Tabs from './tabs/tabs';

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
      <Tabs tabs={tabs} onChange={setActiveId} />
      <Menu menu={activeRestaurant.menu} />
      <Reviews reviews={activeRestaurant.reviews} />
    </div>
  );
}
