import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';
import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
  it('should render', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  })

  it('should have proper text data', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(review.user);
    expect(wrapper.find('[data-id="review-comment"]').text()).toBe(review.text);
  })

  // review.rating -- 5, length -- 10 ¯\_(ツ)_/¯
  /*
    it('should have proper rating', () => {
      const wrapper = mount(<Review {...review} />);

      expect(wrapper.find('[data-id="rating-star-checked"]').length).toBe(review.rating);
    })
  */
})