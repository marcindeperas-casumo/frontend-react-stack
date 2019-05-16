import React from "react";
import { shallow, mount } from "enzyme";
import { ProgressBar, ProgressBarFiller } from "./ProgressBar";

describe("ProgressBarFiller", () => {
  test("Sets width to percentage equal to prop", () => {
    const progress = 50;
    const rendered = shallow(<ProgressBarFiller progress={progress} />);
    const style = rendered.find(".c-progress-bar__filler").get(0).props.style;
    expect(style.width).toEqual(`${progress}%`);
  });

  test("Default colour applied if no props given", () => {
    const progress = 50;
    const defaultForegroundColor = ProgressBar.defaultProps.foregroundColor;
    const rendered = mount(<ProgressBar progress={progress} />);
    expect(
      rendered.find(`.t-background-${defaultForegroundColor}`).length
    ).toEqual(1);
  });

  test("Correct colour applied if passed in through props", () => {
    const progress = 50;
    const foregroundColor = "green";
    const rendered = shallow(
      <ProgressBarFiller
        progress={progress}
        foregroundColor={foregroundColor}
      />
    );
    expect(rendered.hasClass(`t-background-${foregroundColor}`)).toBe(true);
  });
});
