//@flow
import React from "react";
import { shallow, mount } from "enzyme";
import List from "@casumo/cmp-list";
import mockedValuables from "Components/ValuableCard/__mocks__/Valuable.json";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { ValuableRow } from "Components/ValuableRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";
import translationsMock from "./__mocks__/translations.mock.json";

describe("PlayerValuableListVertical", () => {
  const consumeValuable = jest.fn();
  const refetchMock = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
  });

  test("should render skeleton while loading", () => {
    rendered = shallow(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={true}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
      />
    );

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });

  test("should render the correct number of items", () => {
    rendered = shallow(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
    expect(rendered.find(GameRowSkeleton).exists()).toBe(false);
    expect(
      rendered
        .find(List)
        .dive()
        .find(ValuableRow)
    ).toHaveLength(mockedValuables.length);
  });

  test("should render the list title", () => {
    expect(rendered.find(ScrollableListTitle).prop("title")).toEqual(
      translationsMock.listTitleLabel
    );
  });

  test("should refetch when VALUABLES/ITEM_CREATED event is received", () => {
    const mock = jest.fn();
    rendered = mount(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
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
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
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
