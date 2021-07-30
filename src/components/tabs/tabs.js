import PropTypes from 'prop-types';

import styles from './tabs.module.css';
import { NavLink } from 'react-router-dom';

function Tabs({ tabs, to }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label }) => (
        <NavLink
          key={id}
          to={to(id)}
          className={styles.tab}
          activeClassName={styles.active}
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
};

export default Tabs;
