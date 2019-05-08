import React from "react";
import { shallow } from "enzyme";
import { ContentImage } from "./ContentImage";

describe("<ContentImage />", () => {
  const src = "http://foo.com/foo.jpg";
  const alt = "Alternative text.";
  const maxWidth = 500;

  test("renders an <ImageLazy /> under the hood", () => {
    const rendered = shallow(<ContentImage src={src} />);

    expect(rendered.find("ImageLazy")).toHaveLength(1);
  });

  test("passes props to <ImageLazy /> properly", () => {
    const rendered = shallow(
      <ContentImage src={src} alt={alt} maxWidth={maxWidth} />
    );
    const props = rendered
      .find("ImageLazy")
      .first()
      .props();

    expect(props.src).toEqual(src);
    expect(props.alt).toEqual(alt);
    expect(props.imgixOpts.w).toEqual(maxWidth);
  });

  test("defines a default maxWidth for <ImageLazy />", () => {
    const rendered = shallow(<ContentImage src={src} />);
    const props = rendered
      .find("ImageLazy")
      .first()
      .props();

    expect(props.imgixOpts.w).toBeDefined();
  });
});
