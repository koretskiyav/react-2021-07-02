import { mount } from 'enzyme';
import Reviews from './reviews';

import { restaurants } from '../../fixtures';

const reviews = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render reviews', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(2);
  });
});
