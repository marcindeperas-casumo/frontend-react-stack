import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import MockStore from "Components/MockStore/index";
import {
  normalQuery,
  failedQuery,
} from "./__mocks__/query.playerValuables.mock";
import { PlayerValuableListHorizontal } from "./index";

describe("PlayerValuableListHorizontal", () => {
  test("renders skeleton while loading", () => {
    const rendered = mount(
      <MockStore queryMocks={[normalQuery]}>
        <PlayerValuableListHorizontal />
      </MockStore>
    );

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("renders nothing when query fails", async () => {
    const rendered = mount(
      <MockStore queryMocks={[failedQuery]}>
        <PlayerValuableListHorizontal />
      </MockStore>
    );

    await wait(0);

    rendered.update();

    expect(rendered.find("PlayerValuablesTypedQuery").children()).toHaveLength(
      0
    );
  });

  test("renders a number of tiles that match the number returned by query", async () => {
    const rendered = mount(
      <MockStore queryMocks={[normalQuery]}>
        <PlayerValuableListHorizontal />
      </MockStore>
    );

    await wait(0);

    rendered.update();

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);

    expect(rendered.find("DummyPlayerValuableTile")).toHaveLength(5);

    const renderedText = rendered.text();

    expect(renderedText).toContain(
      "Gives you 20% extra with your next deposit (max bonus €200)"
    );

    expect(renderedText).toContain(
      "Gives you 44 free spins in netent-glow_mobile_html_sw"
    );
  });
});
