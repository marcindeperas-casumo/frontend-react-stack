import React from "react";
import { shallow } from "enzyme";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import translationsMock from "./__mocks__/translations.mock.json";

describe("PlayerValuableListHorizontal", () => {
  const mockedValuables = mockValuables();
  const consumeValuable = jest.fn();
  const refetchMock = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PlayerValuableListHorizontal
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
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={true}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
      />
    );

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("should render the correct number of items", () => {
    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);
    expect(rendered.find("ValuableCard")).toHaveLength(mockedValuables.length);
  });

  test("should render the list title", () => {
    expect(rendered.find("ScrollableListTitle").prop("title")).toEqual(
      translationsMock.listTitle
    );
  });

  test("should refetch when onCallback event is received for VALUABLES/ITEM_CREATED sub-event", () => {
    const mock = jest.fn();
    rendered = shallow(
      <PlayerValuableListHorizontal
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
    rendered = shallow(
      <PlayerValuableListHorizontal
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
