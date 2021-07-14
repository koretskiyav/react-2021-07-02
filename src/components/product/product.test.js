import { mount } from 'enzyme';
import Product from './product';

import { restaurants } from '../../fixtures';

const product = restaurants[0].menu[0];

const selectors = {
  product: '[data-id="product"]',
  amount: '[data-id="product-amount"]',
  increment: 'button[data-id="product-increment"]',
  decrement: 'button[data-id="product-decrement"]',
};

function render(props) {
  const wrapper = mount(<Product product={product} {...props} />);

  return {
    getProductsCount: () => wrapper.find(selectors.product).length,
    getAmount: () => wrapper.find(selectors.amount).text(),
    increase: () => wrapper.find(selectors.increment).simulate('click'),
    decrease: () => wrapper.find(selectors.decrement).simulate('click'),
  };
}

describe('Product', () => {
  it('should render', () => {
    const testKit = render();
    expect(testKit.getProductsCount()).toBe(1);
  });

  it('should init from 0 amount', () => {
    const testKit = render();
    expect(testKit.getAmount()).toBe('0');
  });

  it('should increment amount', () => {
    const testKit = render();
    testKit.increase();
    expect(testKit.getAmount()).toBe('1');
  });

  it('should fetch data on mount', () => {
    const fn = jest.fn();
    render({ fetchData: fn });
    expect(fn).toBeCalledWith(product.id);
  });

  it('should init with amount 2', () => {
    const testKit = render({ initialCount: 2 });
    expect(testKit.getAmount()).toBe('2');
  });

  it('should decrement amount', () => {
    const testKit = render({ initialCount: 4 });
    testKit.decrease();
    expect(testKit.getAmount()).toBe('3');
  });

  it("shouldn't decrement with 0 amount", () => {
    const testKit = render();
    testKit.decrease();
    expect(testKit.getAmount()).toBe('0');
  });
});
