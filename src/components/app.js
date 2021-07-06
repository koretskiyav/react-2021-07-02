import { PureComponent } from 'react';

export default class App extends PureComponent {
  state = { value: 0, foo: ['bar'] };

  componentDidMount() {
    console.log('I mounted!');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('I updated!');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextState.value === this.state.value &&
  //     nextState.foo === this.state.foo
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  handleButtonClick = () => {
    this.setState({ value: this.state.value, foo: ['bar'] });
  };

  render() {
    return (
      <div>
        <h1>Hello from App!</h1>
        <p>{this.state.value}</p>
        <button onClick={this.handleButtonClick}>+</button>
      </div>
    );
  }
}
