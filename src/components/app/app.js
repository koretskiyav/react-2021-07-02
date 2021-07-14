import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';

export default class App extends PureComponent {
  state = {
    basketActive: false,
  };

  handleClick = () => {
    this.setState({ basketActive: !this.state.basketActive });
  };

  render() {
    return (
      <div>
        <Header />
        <button onClick={this.handleClick}>Basket</button>
        {this.state.basketActive ? (
          <Basket restaurants={this.props.restaurants} />
        ) : (
          <Restaurants restaurants={this.props.restaurants} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  restaurants: PropTypes.array,
};
