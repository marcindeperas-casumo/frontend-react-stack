import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import {
  SportsNav,
  SportsMainNav,
  SportsSubNav,
} from "Features/sports/components/SportsNav";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";
import { multipleSports } from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";
jest.mock("Utils/hooks/useIsAuthenticated");

const renderMocked = children =>
  mount(
    <MockedProvider mocks={multipleSports} addTypename={false}>
      {children}
    </MockedProvider>
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

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(SportsMainNav)).toHaveLength(1);

    expect(rendered.find(SportsSubNav)).toHaveLength(1);
  });
});
