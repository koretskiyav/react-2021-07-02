import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Reviews from "./reviews";
import { restaurants } from "../../fixtures";

Enzyme.configure({ adapter: new Adapter() });

const reviews = restaurants[0].reviews;
describe("Reviews", () => {
  it("should render reviews when list is not empty", () => {
    const wrapper = mount(<Reviews reviews={reviews} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(2);
  });
  it("should not render reviews when list is empty", () => {
    const wrapper = mount(<Reviews reviews={[]} />);
    expect(wrapper.find('[data-id="review"]').length).toBe(0);
  });
});
