import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { restaurants } from '../../../fixtures';
import Review from '../review';
import Rate from '../../rate';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[1];

describe('Review', () => {
  it('should render root element', () => {
    const wrapper = mount(<Review review={review} />);

    expect(wrapper.exists('[data-id="review"]')).toEqual(true);
  });

  it('should render child elements', () => {
    const wrapper = mount(<Review review={review} />);

    expect(wrapper.exists('[data-id="review-content"]')).toEqual(true);
    expect(wrapper.exists('[data-id="review-name"]')).toEqual(true);
    expect(wrapper.exists('[data-id="review-comment"]')).toEqual(true);
    expect(wrapper.exists('[data-id="review-rate"]')).toEqual(true);
  });

  it('should init from default props', () => {
    const emptyReview = {
      ...review,
      user: undefined,
      text: undefined,
      rating: undefined,
    };
    const wrapper = mount(<Review review={emptyReview} />);

    expect(wrapper.find('[data-id="review-name"]').text()).toBe('Anonymous');
    expect(wrapper.find('[data-id="review-comment"]').text()).toBe('');
    expect(wrapper.find(Rate).prop('value')).toEqual(0);
  });
});
