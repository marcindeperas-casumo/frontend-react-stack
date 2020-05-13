// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { CuratedCard } from "Components/CuratedCard";
import { SportsCuratedCard, CMS_SLUG } from "./SportsCuratedCard";

describe("Sports/WelcomeOfferCuratedCard", () => {
  test("renders empty IF the user has NOT deposited", () => {
    const rendered = shallow(<SportsCuratedCard hasDeposited={false} />);

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders the sports curated card if has deposited", () => {
    const rendered = shallow(<SportsCuratedCard hasDeposited={true} />);

    expect(rendered.find(CuratedCard)).toHaveLength(1);
    expect(rendered.find(CuratedCard).props().slug).toBe(CMS_SLUG);
  });
});
