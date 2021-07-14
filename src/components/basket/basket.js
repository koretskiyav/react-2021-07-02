import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './basket.module.css';
import Button from '../button';
import { decrement, increment, clear } from '../../redux/actions';
import {useMemo} from "react";

function Basket(props) {
    const { decrement, increment, clear, restaurants, order } = props;

    const totalMenu = useMemo(() => {
        return restaurants.reduce((acc, { menu }) => acc.concat(menu), []);
    }, [restaurants]);

    return (
        Object.entries(order)
            .map(([key, value]) => totalMenu
            .map((item) => value > 0 && item.id === key &&
            (<div className={styles.product} data-id="product">
                <div className={styles.content}>
                    <div>
                        <h4 className={styles.title}>{item.name}</h4>
                        <p className={styles.description}>{item.ingredients.join(', ')}</p>
                        <div className={styles.price}>{item.price * value} $</div>
                    </div>
                    <div>
                        <div className={styles.counter}>
                            <div className={styles.count} data-id="product-amount">
                                {value}
                            </div>
                            <div className={styles.buttons}>
                                <Button
                                    onClick={() => decrement(item.id)}
                                    icon="minus"
                                    data-id="product-decrement"
                                />
                                <Button
                                    onClick={() => increment(item.id)}
                                    icon="plus"
                                    data-id="product-increment"
                                />
                                <Button
                                    onClick={() => clear(item.id)}
                                    icon="close"
                                    data-id="product-clear"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    )))
}

Basket.propTypes = {
    restaurants: PropTypes.array.isRequired,
    // from connect
    order: PropTypes.array,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    clear: PropTypes.func,
};

const mapStateToProps = (state) => ({
    order: state.order,
});

const mapDispatchToProps = {
    increment,
    decrement,
    clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
