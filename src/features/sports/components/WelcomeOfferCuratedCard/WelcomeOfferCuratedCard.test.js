// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { WelcomeOfferCuratedCard, CMS_SLUG } from "./WelcomeOfferCuratedCard";

describe("Sports/WelcomeOfferCuratedCard", () => {
  test("renders empty IF the user has already deposited", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard vertical="SPORTS" hasDeposited={true} />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF the user is not a sports user", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard vertical="CASINO" hasDeposited={false} />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF the user is not a sports user and has already deposited", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard vertical="CASINO" hasDeposited={true} />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders the sports welcome offer if a sports user has not deposited yet", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard vertical="SPORTS" hasDeposited={false} />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(CMS_SLUG);
  });
});
