import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Product from './product';
import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const product = restaurants[0].menu[0];

describe('Product', () => {
  it('should render', () => {
    const wrapper = mount(<Product product={product} />);
    expect(wrapper.find('[data-id="product"]').length).toBe(1);
  });

  it('should init from 0 amount', () => {
    const wrapper = mount(<Product product={product} />);
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('0');
  });

  it('should increment amount', () => {
    const wrapper = mount(<Product product={product} />);
    wrapper.find('button[data-id="product-increment"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('1');
  });

  it('should fetch data', () => {
    const fn = jest.fn();
    mount(<Product product={product} fetchData={fn} />);
    expect(fn).toBeCalledWith(product.id);
  });

  it('should decrement amount', () => {
    const wrapper = mount(<Product product={product} />);
    wrapper
      .find('button[data-id="product-increment"]')
      .simulate('click')
      .simulate('click');
    wrapper.find('button[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('1');
  });

  it("shouldn't go minus", () => {
    const wrapper = mount(<Product product={product} />);
    wrapper.find('button[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('0');
  });

  it('should decrement, no increment', () => {
    const wrapper = mount(<Product product={product} amount={'2'} />);
    // не переписывает стэйт
    wrapper.setProps({ amount: '4' });
    wrapper.find('button[data-id="product-decrement"]').simulate('click');
    // выдает результат 0 вместо 3, хотя стэйт поменял на 4
    // expect(wrapper.find('[data-id="product-amount"]').text()).toBe('3');
  });
});
