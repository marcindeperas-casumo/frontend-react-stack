import React from "react";
import { shallow } from "enzyme";
import curatedData from "Components/CuratedCard/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";

describe("CuratedCardBackgroundNew", () => {
  test("should trigger onClick", () => {
    const onClick = jest.fn();
    const component = shallow(
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'link' is missing in type '{ critical_for... Remove this comment to see the full error message
      <CuratedCardBackgroundNew onClick={onClick} {...curatedData} />
    );

    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
