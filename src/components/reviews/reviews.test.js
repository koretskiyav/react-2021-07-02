import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews';
import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);

    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render all review', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);

    expect(wrapper.find('[data-id="review"]').length).toBe(reviews.length);
  });

  it('should render review properly', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    const review = wrapper.find('[data-id="review"]').first();
    const name = review.find('[data-id="name"]');
    const comment = review.find('[data-id="comment"]');
    const rate = review.find('[data-id="rate"]');

    expect(name.length).toBe(1);
    expect(name.text().length).toBeGreaterThan(0);

    expect(comment.length).toBe(1);
    expect(comment.text().length).toBeGreaterThan(0);

    expect(rate.length).toBeGreaterThan(0);
    expect(rate.find('svg').length).toBe(5);
  });
});
