import React from "react";
import { mount } from "enzyme";
import CuratedCardLoader from "Components/CuratedCardLoader/CuratedCardLoader";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CURATED_SLUG, WELCOME_OFFER_CARD } from "Models/curated";
import MockStore from "Components/MockStore";

describe("CuratedCardLoader", () => {
  let rendered;

  const state = {};

  test("should render the welcome offer curated card when hasMadeFirstDeposit is false", () => {
    const expectedSlug = `${CURATED_SLUG}.${WELCOME_OFFER_CARD}`;

    rendered = mount(
      <MockStore state={state}>
        <CuratedCardLoader
          hasMadeFirstDeposit={false}
          defaultCard={curatedData}
        />
      </MockStore>
    );

    const slugProp = rendered.find("CuratedContainer").prop("slug");

    expect(slugProp).toEqual(expectedSlug);
  });

  test("should render curated card from CMS if hasMadeFirstDeposit is true", () => {
    const expectedSlug = `${CURATED_SLUG}.${curatedData.gameData.slug}`;

    rendered = mount(
      <MockStore state={state}>
        <CuratedCardLoader
          hasMadeFirstDeposit={true}
          defaultCardSlug={curatedData.gameData.slug}
        />
      </MockStore>
    );

    const slugProp = rendered.find("CuratedContainer").prop("slug");

    expect(slugProp).toEqual(expectedSlug);
  });
});
