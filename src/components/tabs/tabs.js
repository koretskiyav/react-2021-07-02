import PropTypes from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './tabs.module.css';

function Tabs({ tabs, restId,  onChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label }) => (
        <NavLink
          key={id}
          to={`/restaurants/${restId}/${id}`}
          className={cn(styles.tab)}
          activeClassName={styles.active}
          onClick={() => onChange(id)}

        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
    }).isRequired
  ).isRequired,
  activeId: PropTypes.string,
  restId: PropTypes.string,
};

export default Tabs;
