import basket from './basket.png';
import styles from '../basket/basket.module.css';
import { connect } from 'react-redux';
import { decrement, increment, remove } from '../../redux/actions';
import Item from './item/item';
import { useMemo } from 'react';


function Basket({ restaurants, order, decrement, increment, remove }) {

  const menu = restaurants.map((restaurant) => {
    return restaurant.menu;
  });

  const items = menu.flatMap(restProducts => {
    return Object.keys(order)
      .flatMap(key => {
        return restProducts
          .filter(o => o.id === key)
          .map(o => {
            return {
              id: o.id,
              name: o.name,
              price: o.price,
              count: order[key],
              sumPrice: o.price * order[key]
            };
          });
      });
  })
    .filter(String);


  const orderPrice = useMemo(() => {
    return items.reduce((prev, next) => prev + next.sumPrice, 0);
  }, [items]);

  return (
    <div className={styles.basket}>
      <div>
        <h3>Корзина</h3>
        <img src={basket} className={styles.img} alt='basket' />
        <div>
          {items.length > 0 &&
          items.map(item => (
            <Item key={item.id} item={item}
                  increment={() => increment(item.id)}
                  decrement={() => decrement(item.id)}
                  remove={() => remove(item.id)}
            />
          ))}
        </div>
      </div>
      {items.length > 0 &&
      <h3>Общая стоимость заказа = {orderPrice} </h3>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  order: state.order
});

const mapDispatchToProps = {
  increment,
  decrement,
  remove
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);