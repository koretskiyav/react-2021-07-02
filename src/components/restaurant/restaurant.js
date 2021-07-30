import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

import { restaurantSelector } from '../../redux/features/restaurants';
import { averageRatingSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { label: 'Menu', to: `/restaurants/${id}/menu` },
    { label: 'Reviews', to: `/restaurants/${id}/reviews` },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <Tabs tabs={tabs} />
      <Switch>
        <Route path="/restaurants/:restId/menu">
          <Menu menu={menu} restId={id} />
        </Route>
        <Route path="/restaurants/:restId/reviews">
          <Reviews reviews={reviews} restId={id} />
        </Route>
        <Redirect to="/restaurants/:restId/menu" />
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
