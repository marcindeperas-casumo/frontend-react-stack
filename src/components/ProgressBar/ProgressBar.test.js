import React from "react";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  test("Sets width to percentage equal to prop", () => {
    const rendered = shallow(<ProgressBar progress={50} />);
    const style = rendered.find(".c-progress-bar__filler").get(0).style;
    expect(style).to.have.property("width", "50%");
  });
});
