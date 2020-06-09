// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import {
  TopListCuratedCard,
  CURATED_COMPONENT_GENERAL_SLUG,
} from "./TopListCuratedCard";

describe("TopListCuratedCard", () => {
  test("renders the injected card IF the user has already deposited", () => {
    const slug = "foo";
    const rendered = shallow(
      <TopListCuratedCard
        market={""}
        welcomeOfferId={"welcome-bonus-offer"}
        card={slug}
        hasDeposited={true}
        enforceOriginalSlug={false}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(slug);
  });

  test("renders the 'welcome-offer' card IF the user has NOT deposited yet", () => {
    const slug = "foo";
    const rendered = shallow(
      <TopListCuratedCard
        market={""}
        welcomeOfferId={"welcome-bonus-offer"}
        card={slug}
        hasDeposited={false}
        enforceOriginalSlug={false}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(
      CURATED_COMPONENT_GENERAL_SLUG
    );
  });

  test("if the 'card' prop is an array it takes the first item", () => {
    const slug = ["foo", "bar"];
    const rendered = shallow(
      <TopListCuratedCard
        market={""}
        welcomeOfferId={"welcome-bonus-offer"}
        card={slug}
        hasDeposited={true}
        enforceOriginalSlug={false}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(slug[0]);
  });

  test("renders the injected card IF the user has not deposited yet but 'enforceOriginalSlug' is TRUE", () => {
    const slug = "foo";
    const rendered = shallow(
      <TopListCuratedCard
        market={""}
        welcomeOfferId={"welcome-bonus-offer"}
        card={slug}
        hasDeposited={false}
        enforceOriginalSlug={true}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(slug);
  });
});
