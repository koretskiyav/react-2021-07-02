import { useContext } from 'react';
import { userContext } from '../../contexts/user';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';

const Header = () => {
  const { name, setName } = useContext(userContext);

  return (
    <header className={styles.header} onClick={() => setName('Igor')}>
      <Logo />
      <h2>{name}</h2>
    </header>
  );
};

export default Header;
