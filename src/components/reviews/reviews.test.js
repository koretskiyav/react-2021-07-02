import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { restaurants } from '../../fixtures';
import Reviews from '../reviews';
import Review from './review';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;

describe('Reviews', () => {
  it('should render root element', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);

    expect(wrapper.exists('[data-id="reviews"]')).toEqual(true);
  });

  it('should render 2 review components', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);

    expect(wrapper.find(Review).length).toBe(2);
  });

  it('should render fist review component with key="5909796d-5030-4e36-adec-68b8f9ec2d96"', () => {
    const wrapper = mount(<Reviews reviews={reviews} />);

    expect(wrapper.find(Review).first().key()).toEqual(
      '5909796d-5030-4e36-adec-68b8f9ec2d96'
    );
  });
});
