import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';

import { restaurantSelector } from '../../redux/features/restaurants';
import { averageRatingSelector } from '../../redux/selectors';
import styles from '../restaurants/restaurants.module.css';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;


  const tabs = [
    { id: 'menu', label: 'Menu', path: `/restaurants/${id}/menu` },
    { id: 'reviews', label: 'Reviews', path: `/restaurants/${id}/reviews` }
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <div className={styles.tabs}>
        {tabs.map(({ id, label, path }) => (
          <NavLink
            key={id}
            to={path}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path='/restaurants/:id/menu'>
          {({ match }) => <Menu menu={menu} key={match.params.id} restId={match.params.id} />}
        </Route>
        <Route path='/restaurants/:id/reviews'>
          {({ match }) => <Reviews reviews={reviews} restId={match.params.id} />}
        </Route>
        <Redirect to={`/restaurants/${id}/menu`} />
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array
  }).isRequired,
  averageRating: PropTypes.number
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props)
});

export default connect(mapStateToProps)(Restaurant);
