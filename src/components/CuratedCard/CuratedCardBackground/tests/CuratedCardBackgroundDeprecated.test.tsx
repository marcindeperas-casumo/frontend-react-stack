import React from "react";
import { shallow } from "enzyme";
import curatedData from "Components/CuratedCard/__mocks__/curated.json";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";

describe("CuratedCardBackgroundDeprecated", () => {
  test("should trigger onClick", () => {
    const onClick = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundDeprecated
        onClick={onClick}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onClick: Mock<any, any>; small_image: stri... Remove this comment to see the full error message
        small_image={curatedData.image}
        medium_image={curatedData.image}
        large_image={curatedData.image}
      />
    );

    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
