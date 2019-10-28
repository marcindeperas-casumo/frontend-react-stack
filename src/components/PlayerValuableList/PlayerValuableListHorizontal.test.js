//@flow
import * as React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import Scrollable from "@casumo/cmp-scrollable";
import { actWait, updateWrapper, getCache } from "Utils";
import { ValuableCard } from "Components/ValuableCard";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import mockedValuables from "Components/ValuableCard/__mocks__/Valuable";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import { mocks } from "./__mocks__/playerValuableListMocks";
import translationsMock from "./__mocks__/translations.mock.json";

describe("PlayerValuableListHorizontal", () => {
  test("should render skeleton while loading", () => {
    const rendered = mount(
      <MockedProvider mocks={[]}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );
    actWait();

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("should render the correct number of items", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks.mockedValuables} cache={getCache()}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);
    expect(rendered.find(Scrollable).find(ValuableCard)).toHaveLength(
      mockedValuables.length
    );
  });

  test("should render the list title", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks.mockedValuables} cache={getCache()}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(ScrollableListTitleRow).prop("title")).toEqual(
      translationsMock.listTitleLabel
    );
  });

  test("should render a link to list view when valuables exist", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks.mockedValuables} cache={getCache()}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(ScrollableListTitleRow).prop("seeMore").text).toEqual(
      translationsMock.seeAllLabel
    );
  });

  test("should hide link to list view when valuables doesn't exist", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks.emptyValuables}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(ScrollableListTitleRow).prop("seeMore").text).toEqual(
      ""
    );
  });

  test("should render EmptyValuablesList if no valuables are provided", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks.emptyValuables}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(EmptyValuablesList)).toHaveLength(1);
  });
});
