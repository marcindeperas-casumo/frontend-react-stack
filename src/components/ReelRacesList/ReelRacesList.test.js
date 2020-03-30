// @flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import ScrollableList from "Components/ScrollableList";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { ReelRacesList } from "./ReelRacesList";
import { reelRacesListQueryMock } from "./__mocks__/reelRacesStore";

describe("<ReelRacesList /> - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    jest.clearAllMocks();
    setMobileViewport();
    rendered = mount(
      <MockedProvider mocks={[reelRacesListQueryMock]}>
        <ReelRacesList
          reelRaces={reelRacesListQueryMock.result.data.reelRaces}
          title={reelRacesListQueryMock.result.data.title}
          seeMore={reelRacesListQueryMock.result.data.seeMore}
        />
      </MockedProvider>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("renders a ScrollableList", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(1);
  });

  test("passes the list title to the ScrollableList", () => {
    const { title } = rendered.find("ScrollableList").props();

    expect(title).toBe(reelRacesListQueryMock.result.data.title);
  });

  test("passes the games to the ScrollableList", () => {
    const { items } = rendered.find("ScrollableList").props();

    expect(items).toBe(reelRacesListQueryMock.result.data.reelRaces);
  });
});

describe("<ReelRacesList /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockedProvider mocks={[reelRacesListQueryMock]}>
        <ReelRacesList
          reelRaces={reelRacesListQueryMock.result.data.reelRaces}
          title={reelRacesListQueryMock.result.data.title}
          seeMore={reelRacesListQueryMock.result.data.seeMore}
        />
      </MockedProvider>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("doesn't render a ScrollableList", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(0);
  });
});
