import styles from './basket.module.css'
import { ReactComponent as BasketIcon } from '../../icons/basket.svg'
import { connect } from 'react-redux'
import { restaurants } from '../../fixtures'
import { Fragment, useMemo } from 'react'
import BasketProduct from './basket-product/basket-product'

const Basket = ({ order }) => {

  const findProduct = (id) => {
    let result

    restaurants.forEach(r => {
      r.menu.forEach(p => {
        if (p.id === id) {
          result = p
        }
      })
    })

    return result
  }

  const selectedProducts = useMemo(() => {
    let result = []

    for (const key in order) {
      const product = findProduct(key)
      if (!product) break

      const amount = order[key]
      const price = product.price

      if (amount > 0) {
        result.push({
          ...product,
          sum: price * amount,
          amount,
        })
      }
    }

    return result
  }, [order])

  const totalSum = useMemo(() => (
    selectedProducts.reduce(
      (prevSum, currentProduct) => (prevSum + currentProduct.sum), 0
    )
  ), [selectedProducts])

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['header-corner']}>
          <BasketIcon />
        </div>
        <p className={styles['header-title']}>Selected</p>
        <div className={styles['header-corner']}></div>
      </div>
      <div className={styles['selected-products']}>
        {!!selectedProducts.length ? (
          <Fragment>
            {selectedProducts.map(product => (
              <BasketProduct product={product} />
            ))}
            {totalSum && (
              <div className={styles['total']}>
                <span className={'total-title'}>Total:&nbsp;</span>
                <span className={'total-sum'}>{totalSum}$</span>
              </div>
            )}
          </Fragment>
        ) : (
          <p className={styles['no-products-banner']}>No products</p>
        )}
      </div>
    </div>
  )
}

const mapDispatchToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapDispatchToProps)(Basket)
