import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews';
import { restaurants } from '../../fixtures';
import Product from '../product/product.test';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render reviews', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="some-review"]').length).toBe(2);
  });

  it('should render user', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-test="user-name"]').first().text()).toBe('Antony');
  });

  it('should render user text', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-test="user-text"]').first().text()).toBe('Not bad');
  });

  it('should render star count', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-test="star"]').length).toBe(20);
  });
});
