import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './tabs.module.css';

const Tabs = function({ tabs, activeId, onChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label }) => (
        <span
          key={id}
          className={cn(styles.tab, { [styles.active]: id === activeId })}
          onClick={() => onChange(id)}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

const tabsPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(tabsPropTypes).isRequired,
  activeId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
