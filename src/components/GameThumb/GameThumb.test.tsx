import React from "react";
import { shallow } from "enzyme";
import { GameThumb } from "./GameThumb";

describe("GameThumb", () => {
  const src =
    "https://cms.casumo.com/wp-content/uploads/2014/06/Starburst_Thumb.jpg";
  const mark =
    "https://cms.casumo.com/wp-content/uploads/2014/02/Starburst_Logo.png";

  test("sets the default of 56 to width, height and imgixOpts props", () => {
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'mark' is missing in type '{ src: string;... Remove this comment to see the full error message
    const rendered = shallow(<GameThumb src={src} />);

    expect(rendered.prop("width")).toBe(56);
    expect(rendered.prop("height")).toBe(56);
    expect(rendered.prop("imgixOpts").w).toBe(56);
    expect(rendered.prop("imgixOpts").h).toBe(56);
  });

  test("passes src and mark down to ImageLazy", () => {
    const rendered = shallow(<GameThumb src={src} mark={mark} />);

    expect(rendered.prop("src")).toBe(src);
    expect(rendered.prop("mark")).toBe(mark);
  });

  test("passes alt down to ImageLazy", () => {
    const rendered = shallow(<GameThumb alt="foo" src={src} mark={mark} />);

    expect(rendered.prop("alt")).toBe("foo");
  });
});
