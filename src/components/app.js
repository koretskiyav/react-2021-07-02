import { PureComponent } from 'react';
import Header from '../header';
import Basket from "../basket";
import Restaurants from './restaurants';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Basket restaurants={this.props.restaurants} />
        <Restaurants restaurants={this.props.restaurants} />
      </div>
    );
  }
}
