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
});
