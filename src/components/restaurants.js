import { useMemo, useState } from 'react';

//import Menu from './menu';
import Tabs from './tabs';
import Restaurant from './restaurant';
//import Reviews from './reviews';

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
    /*<div>
      <Tabs tabs={tabs} onChange={setActiveId} />
      <Reviews reviews={reviews} />
      <Menu menu={activeRestaurant.menu} />
    </div>*/
    <div>
    <Tabs tabs={tabs} onChange={setActiveId} />
    <Restaurant restaurant={activeRestaurant} />
  </div>
  );
}
