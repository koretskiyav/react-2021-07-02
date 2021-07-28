import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';


import { restaurantSelector } from '../../redux/features/restaurants';
import { averageRatingSelector } from '../../redux/selectors';

import styles from './restaurant.module.css';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { tab: 'menu', label: 'Menu' },
    { tab: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <div className={styles.tabs}>
        {tabs.map(({ tab, label }) => (
          <NavLink
            key={tab}
            to={`/restaurants/${id}/${tab}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {label}
          </NavLink>
        ))}
      </div>  
      <Switch>
          <Route path={`/restaurants/${id}/menu`}>
            <Menu menu={menu} key={id} restId={id} />
          </Route>
          <Route path={`/restaurants/${id}/reviews`}>
            <Reviews reviews={reviews} restId={id} />
          </Route>
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
});

export default connect(mapStateToProps)(Restaurant);
