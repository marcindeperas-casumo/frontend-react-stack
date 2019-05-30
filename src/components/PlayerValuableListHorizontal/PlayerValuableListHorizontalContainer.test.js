import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import {
  normalQuery,
  failedQuery,
} from "./__mocks__/query.playerValuables.mock";
import { PlayerValuableListHorizontal } from "./index";

describe("PlayerValuableListHorizontal", () => {
  test("renders skeleton while loading", () => {
    const rendered = mount(
      <MockedProvider mocks={[normalQuery]} addTypename={false}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  xtest("renders a number of tiles that match the number returned by query", async () => {
    const rendered = mount(
      <MockedProvider mocks={[normalQuery]} addTypename={false}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await wait(0);

    rendered.update();

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);

    expect(rendered.find("ValuableCard")).toHaveLength(5);
  });

  xtest("renders '20% extra' and '44 free spins' coming from props", async () => {
    const rendered = mount(
      <MockedProvider mocks={[normalQuery]} addTypename={false}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await wait(0);

    rendered.update();

    const renderedText = rendered.text();

    expect(renderedText).toContain("20% extra");

    expect(renderedText).toContain("44 free spins");
  });

  test("renders nothing when query fails", async () => {
    const rendered = mount(
      <MockedProvider mocks={[failedQuery]} addTypename={false}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await wait(0);

    rendered.update();

    expect(
      rendered.find("PlayerValuableListHorizontal").children()
    ).toHaveLength(0);
  });
});
