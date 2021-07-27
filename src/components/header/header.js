import { useContext } from 'react';
import { userContext } from '../../contexts/user';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';
import { CurrencyConsumer } from '../../contexts/currency';

const Header = () => {
  const { name, setName } = useContext(userContext);

  return (
    <header className={styles.header} onClick={() => setName('Igor')}>
      <div className={styles.currency}>
        <span className={styles.title}>Currency: </span>
        <CurrencyConsumer>
          {({ currencies, setCurrency }) => {
            return (
              <select onChange={(event) => setCurrency(event.target.value)}>
                {currencies.map(({ code }) => {
                  return (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  );
                })}
              </select>
            );
          }}
        </CurrencyConsumer>
      </div>
      <Logo />
      <h2>{name}</h2>
    </header>
  );
};

export default Header;
