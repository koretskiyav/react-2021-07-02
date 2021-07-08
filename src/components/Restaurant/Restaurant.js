import React from 'react';
import Menu from '../menu'
import { Reviews } from '../Reviews/Reviews';

export const Restaurant = ({ activeRestaurant }) => {

  return (
    <>
      <Menu menu={activeRestaurant.menu} />
      <Reviews reviews={activeRestaurant.reviews} />
    </>
  )
}
