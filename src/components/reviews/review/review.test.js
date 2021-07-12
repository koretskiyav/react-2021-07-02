import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Review from "./review";
import { restaurants } from "../../../fixtures";

Enzyme.configure({ adapter: new Adapter() });

const review = restaurants[0].reviews[0];
describe("Review", () => {
  it("should render review", () => {
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(review.user);
    expect(wrapper.find('[data-id="review-text"]').text()).toBe(review.text);
    expect(wrapper.find('[data-id="review-rate"]').length).toBe(1);
  });
  it("should render default props when user name and text are empty", () => {
    const wrapper = mount(
      <Review review={{ ...review, user: null, text: null }} />
    );
    expect(wrapper.find('[data-id="review-user"]').text()).toBe("Anonymous");
    expect(wrapper.find('[data-id="review-text"]').text()).toBe("Default text");
  });
});
