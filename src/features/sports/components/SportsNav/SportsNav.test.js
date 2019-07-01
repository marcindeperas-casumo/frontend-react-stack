import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import { NAVIGATE_CLIENT_MUTATION } from "Features/sports/state/clientState/mutations";
import {
  SportsNav,
  SportsMainNav,
  SportsSubNav,
  isNavItemSelected,
  onNavItemSelected,
} from "Features/sports/components/SportsNav";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";
import {
  makeOpenModalMutationMocks,
  multipleSports,
} from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";
import { navItems } from "Features/sports/components/SportsNav/__mocks__/navItems";

const mutationMocks = makeOpenModalMutationMocks(jest);
const mocks = [...multipleSports, ...mutationMocks];

const renderMocked = children =>
  mount(
    <MockedProviderWithContext mocks={mocks} addTypename={false}>
      {children}
    </MockedProviderWithContext>
  );

describe("<SportsNav/>", () => {
  beforeEach(jest.restoreAllMocks);

  test("should render skeleton while loading navigation data", async () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    expect(rendered.find(SportsNavSkeleton)).toHaveLength(1);
  });

  test("should not be rendered on #event, or #bethistory kambi routes", async () => {
    const renderedOnEventPage = renderMocked(
      <SportsNav currentHash="#event" />
    );
    const renderedOnBethistoryPage = renderMocked(
      <SportsNav currentHash="#bethistory" />
    );

    expect(renderedOnEventPage.html()).toBe(null);
    expect(renderedOnBethistoryPage.html()).toBe(null);
  });

  test("should render without errors once data is resolved", async () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    await wait(0);
    rendered.update();

    expect(rendered.find(SportsMainNav)).toHaveLength(1);
    expect(rendered.find(SportsSubNav)).toHaveLength(1);
  });

  test("should open CHOOSE_FAVOURITES modal when editing main nav", async () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    await wait(0);
    rendered.update();

    rendered
      .find(SportsMainNav)
      .props()
      .onEdit();

    await wait(0);

    expect(mutationMocks[0].result).toHaveBeenCalledTimes(1);
  });

  test("should open CHOOSE_FAVOURITE_COMPETITIONS modal when editing sub nav", async () => {
    const rendered = renderMocked(<SportsNav currentHash="#home" />);

    await wait(0);
    rendered.update();

    rendered
      .find(SportsSubNav)
      .props()
      .onEdit();

    await wait(0);

    expect(mutationMocks[1].result).toHaveBeenCalledTimes(1);
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
