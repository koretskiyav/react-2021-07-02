import { useContext } from 'react';
import { userContext } from '../../contexts/user';
import CurrencySelector from '../currencySelector';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';

const Header = () => {
  const { name, setName } = useContext(userContext);

  return (
    <header className={styles.header}>
      <CurrencySelector />
      <Logo />
      <h2 onClick={() => setName('Igor')}>{name}</h2>
    </header>
  );
};

export default Header;
