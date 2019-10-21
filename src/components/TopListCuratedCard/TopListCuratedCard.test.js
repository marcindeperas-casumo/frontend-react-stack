// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { TopListCuratedCard, WELCOME_OFFER_SLUG } from "./TopListCuratedCard";

describe("TopListCuratedCard", () => {
  test("renders the injected card IF the user has already deposited", () => {
    const slug = "foo";
    const rendered = shallow(
      <TopListCuratedCard
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
        card={slug}
        hasDeposited={false}
        enforceOriginalSlug={false}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(WELCOME_OFFER_SLUG);
  });

  test("if the 'card' prop is an array it takes the first item", () => {
    const slug = ["foo", "bar"];
    const rendered = shallow(
      <TopListCuratedCard
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
        card={slug}
        hasDeposited={false}
        enforceOriginalSlug={true}
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(slug);
  });
});
