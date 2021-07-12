import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews';
import Review from './review';
import { restaurants } from '../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews-root"]').length).toBe(1);
  });

  it('should render React components according to fixture', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find(Review).map((r) => r.key())).toEqual(
      reviews.map((r) => r.id)
    );
  });
});
