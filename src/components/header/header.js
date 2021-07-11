import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Logo />
  </header>
);

export default Header;
