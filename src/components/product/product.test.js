import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Product from './product';
import { restaurants } from '../../fixtures';
import React from 'react';

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

  it('should amount be zero', () => {
    const wrapper = mount(<Product product={product} />);
    wrapper.find('button[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('0');
  });

  it('should decrement amount without use increment', () => {

  //   тут я столкнулась с проблемой вообще понять, что в компоненте используется
  //   hocs. Т.е. каких-то явных указателей в коде не смогла найти(перейти по клику, увидеть,
  //   что данная ф-ция используется в том или другом компоненте)
  //   Вопрос как же находить подобное в огромном проекте быстро и легко?
  //   ну или может не туда тыкала, не так смотрела
    const realUseState = React.useState;
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(5))

    const wrapper = mount(<Product product={product}   />);
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('5');
    wrapper.find('button[data-id="product-decrement"]').simulate('click');
    expect(wrapper.find('[data-id="product"]').length).toBe(1);
    expect(wrapper.find('[data-id="product-amount"]').text()).toBe('4');
  });

});
