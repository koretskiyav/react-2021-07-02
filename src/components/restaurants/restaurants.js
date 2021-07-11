import { useMemo, useState } from 'react';

import Rate from '../rate/';
import Tabs from '../tabs/';
import Restaurant from '../restaurant';

import style from './restaurants.module.css';

export default function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(restaurants[0].id);

  const tabs = useMemo(
    () => restaurants.map(({ id, name, reviews}) => ({ id, label: name, reviews})),
    [restaurants]
  );

  const activeRestaurant = useMemo(
    () => findActiveRestaurant(restaurants, activeId),
    [activeId, restaurants]
  );

  const activeRestaurantInfo = findActiveRestaurant(restaurants, activeId);

  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} />
      <div className={style.rating}>
        <p>The rating of the <b>{activeRestaurantInfo.name}</b> restaurant is:</p>
        <Rate value={rating(activeRestaurantInfo.reviews)} />
      </div>
      <Restaurant restaurant={activeRestaurant}/>
    </div>
  );
}

const findActiveRestaurant = (restaurants, activeId) => {
  return restaurants.find((restaurant) => restaurant.id === activeId);
}

const rating = (reviews) => {
  const total = reviews.reduce((sum, current) => sum + current.rating, 0);
  const averageRating = Math.round(total / reviews.length);
  
  return averageRating;
}