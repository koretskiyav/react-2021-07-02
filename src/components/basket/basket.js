import { connect } from 'react-redux';
import Product from '../product';
import styles from './basket.module.css';

function Basket ({ restaurants, order, className}) {

    const filterMenu = []; 
    let totalCount = 0;
    
    restaurants.forEach(element => {
        element.menu.forEach(product => {
            if (order[product.id]) {
                filterMenu.push(product);
                totalCount+=order[product.id]*product.price;
            }
        });
    });

    return (
        <div className={className}>
            <div className={styles.header}>{'Корзина'}</div>
            <div>
            {filterMenu.length ?
                filterMenu.map((product) => (
                    <Product key={product.id} product={product} hasTotal={true} />
                )) : 
                'В корзине пусто'}
            </div>
            <div className={styles.footer}>{'Итого: '}{totalCount}</div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    order: state.order,
});

export default connect(mapStateToProps)(Basket);