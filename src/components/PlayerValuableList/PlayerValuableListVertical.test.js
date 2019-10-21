//@flow
import React from "react";
import { shallow, mount } from "enzyme";
import mockedValuables from "Components/ValuableRow/__mocks__/Valuable.json";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { getValuablesByState, VALUABLE_STATES } from "Models/valuables";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import SectionList from "Components/SectionList";
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

  test("Should render a SectionList", () => {
    const rendered = mount(
      <PlayerValuableListVertical
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
    expect(rendered.find(SectionList)).toHaveLength(1);
    expect(rendered.find(SectionList).prop("sections")).toEqual([
      {
        title: translationsMock.availableListTitleLabel,
        data: getValuablesByState(VALUABLE_STATES.FRESH)(mockedValuables),
      },
      {
        title: translationsMock.lockedListTitleLabel,
        data: getValuablesByState(VALUABLE_STATES.LOCKED)(mockedValuables),
      },
    ]);
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

  test("should render EmptyValuablesList if no valuables are provided", () => {
    const rendered = mount(
      <PlayerValuableListVertical
        valuables={[]}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
        refetch={refetchMock}
      />
    );
    expect(rendered.find(EmptyValuablesList)).toHaveLength(1);
  });
});
