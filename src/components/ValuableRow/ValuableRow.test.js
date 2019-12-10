import React from "react";
import { shallow, mount } from "enzyme";
import { MoreIcon } from "@casumo/cmp-icons";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import { VALUABLE_TYPES } from "Models/valuables";
import ImageLazy from "Components/Image/ImageLazy";
import { ValuableRow } from "./ValuableRow";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";
import ValuableSelector from "./valuable-selector.svg";

const onClick = jest.fn();

describe("ValuableRow", () => {
  let rendered;
  let mockValuable;
  const onMoreInfo = jest.fn();

  beforeEach(() => {
    mockValuable = mockData(VALUABLE_TYPES.CASH);
    rendered = shallow(
      <ValuableRow
        {...mockValuable}
        onClick={onClick}
        onMoreInfo={onMoreInfo}
      />
    );
  });

  test("should always pass an image url to ValuableThumbnail if type is not SPINS", () => {
    rendered = mount(<ValuableRow {...mockValuable} onClick={onClick} />);
    const { backgroundImage: expectedValue } = mockValuable;
    const actualValue = rendered
      .find(ValuableThumbnail)
      .find(ImageLazy)
      .prop("src");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should not display any description if valuableType is not SPINS", () => {
    expect(
      rendered.find({ "data-test": "valuable-row-description" })
    ).toHaveLength(0);
  });

  test("Should call the onMoreInfo when the more icon is clicked", () => {
    const stopPropagation = jest.fn();
    const moreIcon = rendered.find(MoreIcon);

    moreIcon.simulate("click", { stopPropagation });

    expect(onMoreInfo).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  test("should call the onClick on click of ValuableRow", () => {
    rendered.find({ "data-test": "valuable-row" }).simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should display valuable selector when ValuableRow is selected", () => {
    rendered = shallow(
      <ValuableRow {...mockValuable} isSelected={true} onClick={onClick} />
    );

    expect(rendered.find(ValuableSelector).exists()).toBe(true);
  });

  test("should not display valuable selector when ValuableRow is not selected", () => {
    rendered = shallow(
      <ValuableRow {...mockValuable} isSelected={false} onClick={onClick} />
    );

    expect(rendered.find(ValuableSelector).exists()).toBe(false);
  });

  test("should not display valuable selector when ValuableRow by default", () => {
    expect(rendered.find(ValuableSelector).exists()).toBe(false);
  });
});
