import React from "react";
import { shallow, mount } from "enzyme";
import MockStore from "Components/MockStore/index";
import { normalQuery } from "./__mocks__/query.playerValuables.mock";
import { PlayerValuableListHorizontal } from "./index";

describe("PlayerValuableListHorizontal", () => {
  test("renders skeleton while loading", () => {
    const rendered = mount(
      <MockStore queryMocks={[normalQuery]}>
        <PlayerValuableListHorizontal />
      </MockStore>
    );

    expect(rendered.key()).toEqual("player-valuables-list-skeleton");
  });
});
