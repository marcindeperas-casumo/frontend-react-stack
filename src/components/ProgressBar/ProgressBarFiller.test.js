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
    const defaultTrackClassNames = ProgressBar.defaultProps.trackClassNames;
    const rendered = mount(<ProgressBar progress={progress} />);
    expect(rendered.find(`.${defaultTrackClassNames}`).length).toEqual(1);
  });

  test("Correct colour applied if passed in through props", () => {
    const progress = 50;
    const trackClassNames = "t-background-green-30";
    const rendered = shallow(
      <ProgressBarFiller
        progress={progress}
        trackClassNames={trackClassNames}
      />
    );
    expect(rendered.hasClass(trackClassNames)).toBe(true);
  });
});
