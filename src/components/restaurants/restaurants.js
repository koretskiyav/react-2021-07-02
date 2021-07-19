import { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { orderRestaurantsSelector } from '../../redux/selectors';
import { changeActiveRestaurant } from '../../redux/features/activeRestaurant';

function Restaurants({ restaurants, activeId, setActiveId }) {
  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );
  
  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant id={activeId} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  setActiveId: (id) => dispatch(changeActiveRestaurant(id))
});

export default connect((state) => ({
  restaurants: orderRestaurantsSelector(state),
  activeId: state.activeRestaurant
}), mapDispatchToProps)(Restaurants);
