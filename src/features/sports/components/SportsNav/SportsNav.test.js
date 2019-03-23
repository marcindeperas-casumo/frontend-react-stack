import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import { NAVIGATE_CLIENT_MUTATION } from "Features/sports/state/clientState/mutations";
import SportsNav, { isNavItemSelected, onNavItemSelected } from "./SportsNav";
import SportsNavSkeleton from "./SportsNavSkeleton";
import SportsMainNav from "./SportsMainNav";
import SportsSubNav from "./SportsSubNav";
import mocks from "./__mocks__/userNavigationQuery";
import navItems from "./__mocks__/navItems";

describe("<SportsNav/>", () => {
  test("should render skeleton while loading navigation data", async () => {
    const rendered = mount(
      <MockedProviderWithContext
        mocks={mocks.multipleSports}
        addTypename={false}
      >
        <SportsNav currentHash={"#home"} />
      </MockedProviderWithContext>
    );

    expect(rendered.find(SportsNavSkeleton)).toHaveLength(1);
  });

  test("should not be rendered on #event, or #bethistory kambi routes", async () => {
    const renderedOnEventPage = mount(
      <MockedProviderWithContext
        mocks={mocks.multipleSports}
        addTypename={false}
      >
        <SportsNav currentHash={"#event"} />
      </MockedProviderWithContext>
    );
    const renderedOnBethistoryPage = mount(
      <MockedProviderWithContext
        mocks={mocks.multipleSports}
        addTypename={false}
      >
        <SportsNav currentHash={"#bethistory"} />
      </MockedProviderWithContext>
    );

    expect(renderedOnEventPage.html()).toBe(null);
    expect(renderedOnBethistoryPage.html()).toBe(null);
  });

  test("should render without errors once data is resolved", async () => {
    const rendered = mount(
      <MockedProviderWithContext
        mocks={mocks.multipleSports}
        addTypename={false}
      >
        <SportsNav currentHash={"#home"} />
      </MockedProviderWithContext>
    );

    await wait(0);
    rendered.update();

    expect(rendered.find(SportsMainNav)).toHaveLength(1);
    expect(rendered.find(SportsSubNav)).toHaveLength(1);
  });

  test("should open CHOOSE_FAVOURITES modal when editing main nav", async () => {
    // Currently not easy to test for this until this is released https://github.com/apollographql/apollo-feature-requests/issues/84
    // leaving these tests here as a reminder
    // TODO:(@adampilks) - implement
  });

  test("should open CHOOSE_FAVOURITE_COMPETITIONS modal when editing sub nav", async () => {
    // Currently not easy to test for this until this is released https://github.com/apollographql/apollo-feature-requests/issues/84
    // leaving these tests here as a reminder
    // TODO:(@adampilks) - implement
  });

  describe("isNavItemSelected()", () => {
    test("should check if navItem's path matches the current location", () => {
      expect(isNavItemSelected(`#${navItems[0].path}`, navItems[0], true)).toBe(
        true
      );

      expect(isNavItemSelected(`#${navItems[0].path}`, navItems[1], true)).toBe(
        false
      );
    });

    test("should check if the navItem is a parent of the current location if sub path matching is enabled", () => {
      expect(
        isNavItemSelected(`#${navItems[0].subNav[0].path}`, navItems[0], true)
      ).toBe(true);

      expect(
        isNavItemSelected(`#${navItems[1].subNav[2].path}`, navItems[1], true)
      ).toBe(true);

      expect(
        isNavItemSelected(`#${navItems[1].subNav[2].path}`, navItems[0], true)
      ).toBe(false);
    });

    test("should not check if the navItem is a parent of the current location if sub path matching is disabled", () => {
      expect(
        isNavItemSelected(`#${navItems[0].subNav[0].path}`, navItems[0], false)
      ).toBe(false);

      expect(
        isNavItemSelected(`#${navItems[1].subNav[2].path}`, navItems[1], false)
      ).toBe(false);

      expect(
        isNavItemSelected(`#${navItems[1].subNav[2].path}`, navItems[0], false)
      ).toBe(false);
    });

    test("should test against the drill-down version of the path", () => {
      expect(
        isNavItemSelected(`#drill-down/football/test`, {
          path: "filter/football/test",
        })
      ).toBe(true);

      expect(
        isNavItemSelected(`#drill-down/uk/test`, {
          path: "racing/uk/test",
        })
      ).toBe(true);

      expect(
        isNavItemSelected(`#drill-down/uk/test`, {
          path: "racing/football/test",
        })
      ).toBe(false);
    });
  });

  describe("onNavItemSelected()", () => {
    test("should call navigateClient mutation when an item is selected with correct path and location", () => {
      const client = { mutate: jest.fn() };
      onNavItemSelected("#home", navItems[0], client);

      expect(client.mutate).toHaveBeenCalledWith({
        mutation: NAVIGATE_CLIENT_MUTATION,
        variables: {
          path: navItems[0].path,
          trackingLocation: "SportsNav",
        },
      });
    });

    test("should navigate to parent path, if navItem path is current location, if the navItem has a parentPath", () => {
      const client = { mutate: jest.fn() };

      // No parentPath
      onNavItemSelected(`#${navItems[0]}`, navItems[0], client);

      expect(client.mutate).toHaveBeenNthCalledWith(1, {
        mutation: NAVIGATE_CLIENT_MUTATION,
        variables: {
          path: navItems[0].path,
          trackingLocation: "SportsNav",
        },
      });

      onNavItemSelected(
        `#${navItems[0].subNav[1].path}`,
        navItems[0].subNav[1],
        client
      );

      expect(client.mutate).toHaveBeenNthCalledWith(2, {
        mutation: NAVIGATE_CLIENT_MUTATION,
        variables: {
          path: navItems[0].path,
          trackingLocation: "SportsNav",
        },
      });
    });
  });
});
