import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from './review';

import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Reviews', () => {

  it('should render', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('should render and check data', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(review.user);
    expect(wrapper.find('[data-id="review-text"]').text()).toBe(review.text);
    expect(wrapper.find('[data-id="review-rating"]').length).toBe(1);
  });

  it('should render with empty user and text', () => {
    const data = {
      'id': review.id,
      'rating': review.rating
    }
    const wrapper = mount(<Review {...data} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe('Anonymous');
    expect(wrapper.find('[data-id="review-text"]').text()).toBe('I appreciated the restaurant');
    expect(wrapper.find('[data-id="review-rating"]').length).toBe(1);
  });

});