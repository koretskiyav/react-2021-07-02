import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './tabs.module.css';

function Tabs({ tabs, activeId, restId }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label }) => (
        <Link
            to={`/restaurants/${restId}/${id}`}
            className={cn(styles.tab, { [styles.active]: id === activeId })}
            key={id}
        >{label}</Link>
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
    restId: PropTypes.string.isRequired,
};

export default Tabs;
