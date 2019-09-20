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

  test("should render skeleton while loading", () => {
    const rendered = shallow(
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
    const rendered = shallow(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
    const availableValuables = rendered
      .find(List)
      .at(0)
      .dive()
      .find(ValuableRow);
    const lockedValuables = rendered
      .find(List)
      .at(1)
      .dive()
      .find(ValuableRow);
    expect(rendered.find(GameRowSkeleton).exists()).toBe(false);
    expect(availableValuables.length + lockedValuables.length).toBe(
      mockedValuables.length
    );
  });

  test("should render the list titles", () => {
    const rendered = shallow(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
    const listTitles = rendered.find(ScrollableListTitle);
    expect(listTitles.at(0).prop("title")).toEqual(
      translationsMock.availableListTitleLabel
    );
    expect(listTitles.at(1).prop("title")).toEqual(
      translationsMock.lockedListTitleLabel
    );
  });

  test("should refetch when VALUABLES/ITEM_CREATED event is received", () => {
    const mock = jest.fn();
    mount(
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
    const rendered = mount(
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
