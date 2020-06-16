// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { MARKETS } from "Src/constants";
import {
  TopListCuratedCard,
  getWelcomeOfferSlug,
  CURATED_COMPONENT_GENERAL_SLUG,
  CASHBACK_WELCOME_OFFER_ID,
  CURATED_COMPONENT_JP_CASHBACK_SLUG,
} from "./TopListCuratedCard";

describe("TopListCuratedCard", () => {
  test("renders the injected card IF the user has already deposited", () => {
    const slug = "foo";
    const rendered = shallow(
      <TopListCuratedCard
        market={""}
        welcomeOfferId={CURATED_COMPONENT_GENERAL_SLUG}
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
        welcomeOfferId={CURATED_COMPONENT_GENERAL_SLUG}
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
        welcomeOfferId={CURATED_COMPONENT_GENERAL_SLUG}
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
        welcomeOfferId={CURATED_COMPONENT_GENERAL_SLUG}
        card={slug}
        hasDeposited={false}
        enforceOriginalSlug={true}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(slug);
  });

  test("getWelcomeOfferSlug should provide correct cms page slug for CuratedCard component", () => {
    const woCode = "example-wo-code";
    const slug = getWelcomeOfferSlug(woCode, MARKETS.gb_en);
    expect(slug).toEqual(CURATED_COMPONENT_GENERAL_SLUG);

    // for japan and cashback, it will show some specific content
    const cashbackWoCode = CASHBACK_WELCOME_OFFER_ID;
    const jpCashbackSlug = getWelcomeOfferSlug(cashbackWoCode, MARKETS.jp_ja);
    expect(jpCashbackSlug).toEqual(CURATED_COMPONENT_JP_CASHBACK_SLUG);

    // for every other welcome offer ids, japan gets the default curated card
    const returnedSlug = getWelcomeOfferSlug(woCode, MARKETS.jp_ja);
    expect(returnedSlug).toEqual(CURATED_COMPONENT_GENERAL_SLUG);
  });
});
