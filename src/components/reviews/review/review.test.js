import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';
import { restaurants } from '../../../fixtures';

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];

describe('Review', () => {
  it('should render', () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(1);
  });

  it('should render correct review`s user', () => {
    const wrapper = shallow(<Review {...review} />);
    expect(wrapper.find('h4').text()).toBe(review.user);
  });

  it('should render correct review`s text', () => {
    const wrapper = shallow(<Review {...review} />);
    expect(wrapper.find('p').text()).toBe(review.text);
  });
});
