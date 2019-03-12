import React from "react";
import { mount } from "enzyme";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  test("Sets width to percentage equal to prop", () => {
    const progress = 50;
    const rendered = mount(<ProgressBar progress={progress} />);
    const style = rendered.find(".c-progress-bar__filler").get(0).props.style;
    expect(style.width).toEqual(`${progress}%`);
  });
});
