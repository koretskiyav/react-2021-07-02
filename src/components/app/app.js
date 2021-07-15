import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';

import styles from './app.module.css'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <Restaurants className={styles.restaurants} restaurants={this.props.restaurants} />
          <Basket className={styles.basket}  restaurants={this.props.restaurants} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  restaurants: PropTypes.array,
};
