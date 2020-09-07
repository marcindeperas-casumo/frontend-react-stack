// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { WelcomeOfferCuratedCard, CMS_SLUG } from "./WelcomeOfferCuratedCard";

describe("Sports/WelcomeOfferCuratedCard", () => {
  test("renders empty IF the user has already deposited", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard
        vertical="SPORTS"
        hasDeposited={true}
        currentHash="#home"
      />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF the user is not home page", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard
        vertical="SPORTS"
        hasDeposited={false}
        currentHash="#nothome"
      />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF the user is not a sports user", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard
        vertical="CASINO"
        hasDeposited={false}
        currentHash="#home"
      />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF the user is not a sports user and has already deposited", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard
        vertical="CASINO"
        hasDeposited={true}
        currentHash="#home"
      />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders the sports welcome offer if a sports user has not deposited yet", () => {
    const rendered = shallow(
      <WelcomeOfferCuratedCard
        vertical="SPORTS"
        hasDeposited={false}
        currentHash="#home"
      />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(CMS_SLUG);
  });
});
