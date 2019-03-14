// @flow
import React from "react";
import { mount } from "enzyme";
import {
  REACT_APP_EVENT_MENU_OPENED,
  REACT_APP_EVENT_MENU_CLOSED,
  REACT_APP_SPORTS_SHOW_SEARCH,
} from "Src/constants";
import bridge from "Src/DurandalReactBridge";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import {
  SportsStateProvider,
  ClientContext,
  OPEN_MODAL_MUTATION,
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
} from "Features/sports/state";
import sportsShellMock from "./__mocks__/sportsShellQuery";
import { SportsShellContainer } from "./SportsShellContainer";

describe("<SportsShellContainer />", () => {
  // @RafQL: this test is passing but doesn't feel quite isolated enough...
  test("should create a working listener on the bridge to show sports search", async () => {
    const rendered = mount(
      <MockedProviderWithContext mocks={sportsShellMock} addTypename={false}>
        <SportsShellContainer />
      </MockedProviderWithContext>
    );

    const instance = rendered.find(SportsShellContainer).instance();
    const mutate = jest.spyOn(instance.context.client, "mutate");

    instance.componentDidMount();
    bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH);

    console.log(mutate);

    // @RafQL: how can I negate the need to include the OPEN_MODAL_MUTATION for this test?
    expect(mutate).toHaveBeenCalledTimes(2);

    expect(mutate).toHaveBeenCalledWith({
      mutation: HIDE_SEARCH,
    });
  });

  test("should listener on the bridge to show sports search", async () => {
    //
  });

  // @RafQL: can you check if my list of shit to test sounds valid?
  // if not, perhaps you push a commit with changes to how you'd structure the tests instead?

  /* SHIT TO TEST BELOW !! */

  // when has selected favourites
  // - should not fire open modal mutation
  // - should render a kambiclient

  // when has not selected favourites
  // - should fire open modal mutation
  // - should render null

  // when search is not visible
  // - should render sports nav

  // when search is visible
  // - should render sports search

  // when query errors
  // - should show skeleton
  //   (add todo and link to issue for showing error component instead)

  // when query is loading
  // - should show skeleton

  // when mounted
  // - should create working listeners on the bridge for:
  //   - showing search
  //   - hiding search
  //   - showing betslip
  //   - hiding betslip
});
