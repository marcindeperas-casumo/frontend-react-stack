import React from "react";
import { shallow } from "enzyme";
import CasumoAvatar, { getClassModifier } from "./CasumoAvatar";

describe("CasumoAvatar", () => {
  test("Renders avatar with the correct color class applied", () => {
    const beltLevel = 5;
    const classModifier = getClassModifier(beltLevel);
    const rendered = shallow(<CasumoAvatar beltLevel={beltLevel} />);

    expect(rendered.find(`.${classModifier}`).length).toBe(1);
  });
  test("Color class defaults to lowest level if unknown level is passed as prop", () => {
    const beltLevel = "erroneous value";
    const defaultClassModifier = getClassModifier(0);
    const rendered = shallow(<CasumoAvatar beltLevel={beltLevel} />);

    expect(rendered.find(`.${defaultClassModifier}`).length).toBe(1);
  });
});
