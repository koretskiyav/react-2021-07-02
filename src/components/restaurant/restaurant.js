import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { Switch, Route, Redirect } from 'react-router-dom';

import { restaurantSelector } from '../../redux/features/restaurants';
import { averageRatingSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <Tabs tabs={tabs} restId={id} onChange={setActiveTab} />
      <Switch>
        <Route path={`/restaurants/${id}/${activeTab}`}>
          {activeTab === 'menu' ? (
            <Menu menu={menu} key={id} restId={id} />
          ) : (
            <Reviews reviews={reviews} restId={id} />
          )}
        </Route>
        <Route path={`/restaurants/${id}/reviews`}>
          <Reviews reviews={reviews} restId={id} />
        </Route>
        <Redirect from={`/restaurants/${id}`} to={`/restaurants/${id}/${activeTab}`} />
        <Route path={`/restaurants/${id}}/${activeTab}`}>
          {activeTab === 'menu' ? (
            <Menu menu={menu} key={id} restId={id} />
          ) : (
            <Reviews reviews={reviews} restId={id} />
          )}
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
