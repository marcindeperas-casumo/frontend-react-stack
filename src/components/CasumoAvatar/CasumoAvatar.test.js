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
  test("Renders avatar with the yellow background color when at max level", () => {
    const level = 180;
    const inBonusMode = true;
    const rendered = shallow(
      <CasumoAvatar belt="rope" level={level} inBonusMode={inBonusMode} />
    );

    expect(rendered.find(`.t-background-yellow-30`).length).toBe(1);
  });

  test("Renders avatar with the purple background color when in bonus mode", () => {
    const level = 60;
    const inBonusMode = true;
    const rendered = shallow(
      <CasumoAvatar belt="rope" level={level} inBonusMode={inBonusMode} />
    );

    expect(rendered.find(`.t-background-purple-5`).length).toBe(1);
  });
});
