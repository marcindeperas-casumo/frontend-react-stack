import React from "react";
import { shallow } from "enzyme";
import { ProgressBarFiller } from "./ProgressBar";

describe("ProgressBarFiller", () => {
  test("Sets width to percentage equal to prop", () => {
    const progress = 50;
    const rendered = shallow(<ProgressBarFiller progress={progress} />);
    const style = rendered.find(".c-progress-bar__filler").get(0).props.style;
    expect(style.width).toEqual(`${progress}%`);
  });
});
