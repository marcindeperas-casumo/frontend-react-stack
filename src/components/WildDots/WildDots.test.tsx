// @flow
import * as React from "react";
import * as R from "ramda";
import { shallow } from "enzyme";
import { WildDots } from "./WildDots";

describe("WildDots", () => {
  test("renders right number of dots", () => {
    R.times(() => {
      const random = Math.round(Math.random() * 100);
      const render = shallow(
        <WildDots numberOfDots={random} activeDotIndex={0} />
      );

      expect(render).toHaveLength(random);
    }, 13);
  });

  test("renders right dot is active", () => {
    R.times(() => {
      const random = Math.round(Math.random() * 99);
      const render = shallow(
        <WildDots
          numberOfDots={100}
          activeDotIndex={random}
          activeDotClassNames="c-wild-dot--active"
        />
      );

      expect(render.find(".c-wild-dot--active")).toHaveLength(1); // only one dot is active
      expect(render.at(random).find(".c-wild-dot--active")).toHaveLength(1); // and it's under our index
    }, 13);
  });
});
