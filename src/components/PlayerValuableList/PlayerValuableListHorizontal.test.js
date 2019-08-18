//@flow
import React from "react";
import { shallow, mount } from "enzyme";
import Scrollable from "@casumo/cmp-scrollable";
import mockedValuables from "Components/ValuableCard/__mocks__/Valuable.json";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { ValuableCard } from "Components/ValuableCard";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import translationsMock from "./__mocks__/translations.mock.json";

describe("PlayerValuableListHorizontal", () => {
  const consumeValuable = jest.fn();
  const launchGame = jest.fn();
  const refetchMock = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        onLaunchGame={launchGame}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
  });

  test("should render skeleton while loading", () => {
    rendered = shallow(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={true}
        onConsumeValuable={consumeValuable}
        onLaunchGame={launchGame}
        translations={translationsMock}
      />
    );

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("should render the correct number of items", () => {
    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);
    expect(rendered.find(Scrollable).find(ValuableCard)).toHaveLength(
      mockedValuables.length
    );
  });

  test("should render the list title", () => {
    expect(rendered.find("ScrollableListTitle").prop("title")).toEqual(
      translationsMock.listTitleLabel
    );
  });

  test("should refetch when VALUABLES/ITEM_CREATED event is received", () => {
    const mock = jest.fn();
    rendered = mount(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        onLaunchGame={launchGame}
        translations={translationsMock}
        refetch={mock}
      />
    );
    bridge.emit(REACT_APP_EVENT_ON_CALLBACK, {
      event: KO_EVENTS.VALUABLES.ITEM_CREATED,
      data: {
        success: true,
      },
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("should not refetch when component is unmounted", () => {
    const mock = jest.fn();
    rendered = mount(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        onLaunchGame={launchGame}
        translations={translationsMock}
        refetch={mock}
      />
    );
    rendered.unmount();
    bridge.emit(REACT_APP_EVENT_ON_CALLBACK, {
      event: KO_EVENTS.VALUABLES.ITEM_CREATED,
      data: {
        success: true,
      },
    });
    expect(mock).toHaveBeenCalledTimes(0);
  });
});
