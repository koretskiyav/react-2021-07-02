import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews';
import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render user', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="reviews-user"]').length).toBe(review.length);
  });

  it('should render text', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="reviews-text"]').length).toBe(review.length);
  });

  it('should render rating', () => {
    const wrapper = mount(<Reviews reviews={review} />);
    expect(wrapper.find('[data-id="reviews-rating"]').length).toBe(
      review.length
    );
  });
});
