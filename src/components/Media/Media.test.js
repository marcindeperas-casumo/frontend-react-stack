import React from "react";
import { shallow } from "enzyme";
import Media from "@casumo/cmp-media";

describe("Media", () => {
  test("should call renderImage and renderText props", () => {
    const imageSpy = jest.fn();
    const textSpy = jest.fn();
    shallow(<Media renderImage={imageSpy} renderText={textSpy} />);
    expect(imageSpy).toBeCalledTimes(1);
    expect(textSpy).toBeCalledTimes(1);
  });

  test("should render an image and some text", () => {
    const renderImage = () => <img alt="" src="/a.jpg" />;
    const renderText = () => <p>What a sight!</p>;
    const rendered = shallow(
      <Media renderImage={renderImage} renderText={renderText} />
    );
    expect(rendered.find("img").prop("src")).toBe("/a.jpg");
    expect(rendered.find("p").text()).toBe("What a sight!");
  });
});
