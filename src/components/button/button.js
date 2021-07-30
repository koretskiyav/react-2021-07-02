import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './button.module.css';

import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../icons/minus.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

const icons = {
  plus: PlusIcon,
  minus: MinusIcon,
  delete: DeleteIcon,
};

const Button = ({
  icon,
  children,
  primary = false,
  secondary = false,
  small = false,
  block = false,
  disabled = false,
  ...props
}) => {
  const Icon = icons[icon];
  return (
    <button
      disabled={disabled}
      className={cn(styles.button, {
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.small]: small,
        [styles.block]: block,
      })}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
};

export default Button;
