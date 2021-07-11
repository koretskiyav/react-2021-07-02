import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Reviews from './reviews'
import { restaurants } from '../../fixtures';
import expect from 'expect';

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[1].reviews

describe('Reviews', () => {
  it('should render', () => {
    const wrapper = mount(<Reviews reviews={reviews} />)
    expect(wrapper.find('[data-id="review"]').length).toBeGreaterThan(0)
  })

  it('should have all data', () => {
    const wrapper = mount(<Reviews reviews={reviews} />)
    const reviewsCount = wrapper.find('[data-id="review"]').length
    const reviewDataCount = wrapper.find('[data-id="review-data"]').length
    const reviewUserCount = wrapper.find('[data-id="review-user"]').length
    const reviewTextCount = wrapper.find('[data-id="review-text"]').length
    const reviewRatingCount = wrapper.find('[data-id="review-rating"]').length
    expect(reviewsCount).toBe(reviewDataCount)
    expect(reviewsCount).toBe(reviewUserCount)
    expect(reviewsCount).toBe(reviewTextCount)
    expect(reviewsCount).toBe(reviewRatingCount)
  })

  it('total stars for review', () => {
    const wrapper = mount(<Reviews reviews={reviews} />)
    wrapper.find('[data-id="review"]').forEach((node) => {
      const reviewStars = node.find('svg[data-id="review-star"]')
      expect(reviewStars.length).toBe(5)
    })
  })
})
