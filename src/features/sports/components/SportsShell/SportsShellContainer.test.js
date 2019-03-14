// @flow

import React from "react";
import { mount } from "enzyme";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import sportsShellMock from "./__mocks__/sportsShellQuery";
import { SportsShellContainer } from "./SportsShellContainer";

describe("<SportsShellContainer />", () => {
  test("should create a listener on the bridge for showing search", async () => {
    const rendered = mount(
      <MockedProviderWithContext mocks={sportsShellMock} addTypename={false}>
        <SportsShellContainer />
      </MockedProviderWithContext>
    );

    const instance = rendered.find(SportsShellContainer).instance();

    const fetchSports = jest.spyOn(instance.context.client, "mutate");
    instance.componentDidMount();

    // fire import bridge and emit event
    // mock/spy on context.client.mutate
    // test mutation happened once

    expect(fetchSports).toHaveBeenCalledTimes(1);
  });
});
