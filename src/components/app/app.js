import { PureComponent } from 'react';
import Restaurants from '../restaurants';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Restaurants restaurants={this.props.restaurants} />
      </div>
    );
  }
}
