import React from "react";
import { mount } from "enzyme";

import { StatefulPicture } from "./index";

import { getImgixUrl } from "@casumo/cudl-react-utils";
import curatedGame from "Components/CuratedCard/__mocks__/curatedGame.json";

let component;

describe("LazyPicture", () => {
  let images;

  beforeEach(() => {
    images = curatedGame.fields;
    component = mount(
      <StatefulPicture isIntersecting={true} images={images} />
    );
  });

  it("should render the image", () => {
    const img = getImgixUrl(curatedGame.fields.small_image, null, { w: 1.0 });
    const expected = component.find("img").prop("src");
    expect(img).toEqual(expected);
  });

  it("should render srcSet for image", () => {
    const srcSet = component
      .find("source")
      .at(0)
      .prop("srcSet");
    const expected =
      "https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
    expect(srcSet).toEqual(expected);
  });

  afterEach(() => component.unmount());
});
