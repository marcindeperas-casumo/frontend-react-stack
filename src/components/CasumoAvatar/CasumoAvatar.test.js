import React from "react";
import { shallow } from "enzyme";
import { CasumoAvatar, getClassModifier } from "./CasumoAvatar";

describe("CasumoAvatar", () => {
  test("Renders avatar with the correct color class applied", () => {
    const belt = "rope";
    const classModifier = getClassModifier(belt);
    const rendered = shallow(<CasumoAvatar belt={belt} />);

    expect(rendered.find(`.${classModifier}`).length).toBe(1);
  });
  test("Color class defaults to lowest level if unknown level is passed as prop", () => {
    const belt = "erroneous value";
    const defaultClassModifier = getClassModifier("rope");
    const rendered = shallow(<CasumoAvatar belt={belt} />);

    expect(rendered.find(`.${defaultClassModifier}`).length).toBe(1);
  });
});
