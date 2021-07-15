import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './baskets.module.css';
import Basket from './basket';
import { ReactComponent as Shop } from '../../icons/shoppingCart.svg';
import cn from 'classnames';
import PropTypes from 'prop-types';

function Baskets({ baskets }) {
  const [summBasket, setSummBasket] = useState([]);
  const [totalBasket, setTotalBasket] = useState([0]);
  const [visibleShop, setVisibleShop] = useState(false);
  useEffect(() => {
    const total = summBasket.map((item) => {
      return item.summ;
    });
    const price = total.reduce((acc, bask) => acc + bask, 0);
    setTotalBasket(price);
  }, [baskets.price, setSummBasket, summBasket]);

  return (
    <div className={styles.baskets}>
      <button
        className={cn(styles.button, {
          [styles.activeButton]: totalBasket > 0,
        })}
        onClick={() => setVisibleShop((prev) => !prev)}
      >
        <Shop />
        {totalBasket > 0 && <div>{totalBasket}$</div>}
      </button>
      <div className={styles.basket}>
        {visibleShop &&
          (totalBasket > 0 ? (
            <div>
              <h2 className={styles.titleShop}> Ваш заказ: </h2>
            </div>
          ) : (
            <div>
              <h2 className={styles.titleShop}> Ваша корзина пуста </h2>
            </div>
          ))}
        {baskets.map((basket) => (
          <Basket
            key={basket.id}
            basket={basket}
            visibleShop={visibleShop}
            summBasket={summBasket}
            setSummBasket={setSummBasket}
          />
        ))}
        {visibleShop && totalBasket > 0 && (
          <div className={styles.totalPrice}>
            <span>Сумма к оплате:</span>
            {totalBasket > 0 && (
              <div className={styles.numberPrice}>{totalBasket}$</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Baskets.propTypes = {
  baskets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  baskets: state.basket,
});

export default connect(mapStateToProps, null)(Baskets);
