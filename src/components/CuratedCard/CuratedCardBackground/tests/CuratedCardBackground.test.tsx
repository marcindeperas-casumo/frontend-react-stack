import React from "react";
import { shallow } from "enzyme";
import curatedData from "Components/CuratedCard/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";
import { CuratedCardBackground } from "../CuratedCardBackground";

describe("CuratedCardBackground", () => {
  test("should use CuratedCardBackgroundNew if image is passed in", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ link: string; onClick: () => void; image: ... Remove this comment to see the full error message
      <CuratedCardBackground
        link="/promotions"
        onClick={() => {}}
        image={curatedData.image}
      />
    );

    expect(rendered.find(CuratedCardBackgroundNew).length).toBe(1);
  });

  test("should use CuratedCardBackgroundDeprecated if small, medium, and large images are passed in", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ link: string; smallImage: string; mediumIm... Remove this comment to see the full error message
      <CuratedCardBackground
        link="/promotions"
        smallImage={curatedData.image}
        mediumImage={curatedData.image}
        largeImage={curatedData.image}
      />
    );

    expect(rendered.find(CuratedCardBackgroundDeprecated).length).toBe(1);
  });
});
