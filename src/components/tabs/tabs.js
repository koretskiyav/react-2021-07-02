import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './tabs.module.css';
import { NavLink } from 'react-router-dom';

function Tabs({ tabs, /* activeId, onChange */}) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label, path }) => (
        <NavLink
          key={id}
          className={cn(styles.tab)}
          to={path}
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
  activeId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Tabs;
