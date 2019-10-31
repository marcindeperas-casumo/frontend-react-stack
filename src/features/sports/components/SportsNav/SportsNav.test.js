import React from "react";
import { mount } from "enzyme";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import {
  SportsNav,
  SportsMainNav,
  SportsSubNav,
} from "Features/sports/components/SportsNav";
import { updateWrapper } from "Utils";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";
import { multipleSports } from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";

const renderMocked = children =>
  mount(
    <MockedProviderWithContext mocks={multipleSports} addTypename={false}>
      {children}
    </MockedProviderWithContext>
  );

describe("<SportsNav/>", () => {
  beforeEach(jest.restoreAllMocks);

  test("should render skeleton while loading navigation data", () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    expect(rendered.find(SportsNavSkeleton)).toHaveLength(1);
  });

  test("should not be rendered on #event, or #bethistory kambi routes", () => {
    const renderedOnEventPage = renderMocked(
      <SportsNav currentHash="#event" />
    );
    const renderedOnBethistoryPage = renderMocked(
      <SportsNav currentHash="#bethistory" />
    );

    expect(renderedOnEventPage.isEmptyRender()).toBe(true);
    expect(renderedOnBethistoryPage.isEmptyRender()).toBe(true);
  });

  test("should render without errors once data is resolved", async () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    await updateWrapper(rendered);

    expect(rendered.find(SportsMainNav)).toHaveLength(1);

    expect(rendered.find(SportsSubNav)).toHaveLength(1);
  });
  /*
  test("should open CHOOSE_FAVOURITES modal when editing main nav", async () => {
    // TODO: Strategy for Testing Mutations and Apollo Components - https://github.com/casumo/Home/issues/30372
  });

  test("should open CHOOSE_FAVOURITE_COMPETITIONS modal when editing sub nav", async () => {
    // TODO: Strategy for Testing Mutations and Apollo Components - https://github.com/casumo/Home/issues/30372
  });
  */
});
