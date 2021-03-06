import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mount } from "enzyme";
import { SportsNav } from "Features/sports/components/SportsNav";
import { multipleSports } from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";
jest.mock("Utils/hooks/useIsAuthenticated");

const ITEMS_TO_SHOW = 100;
const renderMocked = children =>
  mount(
    <MockedProvider mocks={multipleSports} addTypename={false}>
      {children}
    </MockedProvider>
  );

describe("<SportsNav/>", () => {
  beforeEach(jest.restoreAllMocks);

  test("should not be rendered on or #bethistory kambi routes", () => {
    const renderedOnBethistoryPage = renderMocked(
      <SportsNav
        currentHash="#bethistory"
        hasSelectedFavourites={false}
        itemsToShow={ITEMS_TO_SHOW}
      />
    );

    expect(renderedOnBethistoryPage.isEmptyRender()).toBe(true);
  });
});
