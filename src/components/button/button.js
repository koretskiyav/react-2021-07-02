import PropTypes from 'prop-types';

import styles from './button.module.css';

import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../icons/minus.svg';
import { ReactComponent as CrossIcon } from '../../icons/cross.svg';

const icons = {
  plus: PlusIcon,
  minus: MinusIcon,
  cross: CrossIcon,
};

const Button = ({ icon, ...props }) => {
  const Icon = icons[icon];
  return (
    <button className={styles.button} {...props}>
      {Icon && <Icon />}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
};

export default Button;
