import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { SportsNav } from "Features/sports/components/SportsNav";
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

  test("should not be rendered on or #bethistory kambi routes", () => {
    const renderedOnBethistoryPage = renderMocked(
      <SportsNav currentHash="#bethistory" />
    );

    expect(renderedOnBethistoryPage.isEmptyRender()).toBe(true);
  });
});
