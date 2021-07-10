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
        expect(wrapper.find('[data-id="reviews"]').length).toBe(1);
    });

    it('should render correct amount of children', () => {
        const wrapper = mount(<Reviews reviews={reviews} />);
        expect(wrapper.find('[data-id="reviews"]').children().length).toBe(reviews.length);
    });

    it('should render Review Components', () => {
        const wrapper = mount(<Reviews reviews={reviews} />);
        expect(wrapper.find(Review)).toHaveLength(reviews.length);
    });
});
