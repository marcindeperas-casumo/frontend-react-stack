// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { SportsCuratedCard, CMS_SLUG } from "./SportsCuratedCard";

describe("Sports/WelcomeOfferCuratedCard", () => {
  test("renders empty IF the user has NOT deposited", () => {
    const rendered = shallow(
      <SportsCuratedCard hasDeposited={false} currentHash="#home" />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders empty IF hash is not home", () => {
    const rendered = shallow(
      <SportsCuratedCard hasDeposited={true} currentHash="#nothome" />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders the sports curated card if has deposited", () => {
    const rendered = shallow(
      <SportsCuratedCard hasDeposited={true} currentHash="#home" />
    );

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(CMS_SLUG);
  });
});
