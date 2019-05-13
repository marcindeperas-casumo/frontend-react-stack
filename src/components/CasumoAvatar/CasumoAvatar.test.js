import React from "react";
import { shallow } from "enzyme";
import { CasumoAvatar, getClassModifierByBelt } from "./CasumoAvatar";

describe("CasumoAvatar", () => {
  test("Renders avatar with the correct color class applied based on belt", () => {
    const belt = "rope";
    const classModifier = getClassModifierByBelt(belt);
    const rendered = shallow(<CasumoAvatar belt={belt} />);

    expect(rendered.find(`.${classModifier}`).length).toBe(1);
  });
  test("Renders avatar with the correct background colour class applied", () => {
    const backgroundColour = "violet";
    const rendered = shallow(
      <CasumoAvatar belt="rope" backgroundColour={backgroundColour} />
    );

    expect(rendered.find(`.t-background-violet`).length).toBe(1);
  });
});
