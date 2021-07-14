import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';
import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];
const emptyReview = { ...review, text: ``, user: `` };

describe('Review', () => {
  it('should render', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('should match name', () => {
    const wrapper = mount(<Review key={review.id} {...review} />);
    expect(wrapper.find('[data-id="name"]').text()).toBe(review.user);
  });
  it('should match text', () => {
    const wrapper = mount(<Review key={review.id} {...review} />);
    expect(wrapper.find('[data-id="text"]').text()).toBe(review.text);
  });
  it('should have default name', () => {
    const wrapper = mount(<Review key={review.id} {...emptyReview} />);
    expect(wrapper.find('[data-id="name"]').text()).toBe(
      Review.props.user || `Anonymous`
    );
  });

  it('should  have text empty', () => {
    const wrapper = mount(<Review key={review.id} {...emptyReview} />);
    expect(wrapper.find('[data-id="text"]').text()).toBe(``);
  });
});
