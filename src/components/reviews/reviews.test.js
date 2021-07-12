import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { restaurants } from '../../fixtures';
import Reviews from './reviews';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;
const countReview = reviews.length;

describe('Reviews', () => {

  it('should render ', () => {

    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
  });

  it('should render some children', function() {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="reviews"]').children().length).toBe(countReview);
  });

  it('should render 0 children', function() {
    const wrapper = mount(<Reviews reviews={[]}/>);
    expect(wrapper.find('[data-id="reviews"]').children().length).toBe(0);
  });

})