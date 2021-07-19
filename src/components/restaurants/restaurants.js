import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantsSelector } from '../../redux/features/restaurants';

function Restaurants({ restaurants }) {

  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const tabs = useMemo(
    () => Object.keys(restaurants).map((id) => ({
      id: id,
      label: restaurants[id].name
    })),
    [restaurants]
  );


  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant restaurant={activeId} id={activeId} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  ).isRequired
};


const mapStateToProps = (state) => ({
  restaurants: restaurantsSelector(state)
});


export default connect(mapStateToProps)(Restaurants);
