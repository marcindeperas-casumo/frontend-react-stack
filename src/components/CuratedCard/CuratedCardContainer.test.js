import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "Src/configureStore";
import CuratedCard from "Components/CuratedCard";
import MockStore from "Components/MockStore";

describe("CuratedCardContainer", () => {
  test("should render component", () => {
    const component = mount(
      <Provider store={configureStore()}>
        <CuratedCard />
      </Provider>
    );
    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render CuratedCardSkeleton when isFetched is false", () => {
    const component = mount(
      <Provider store={configureStore()}>
        <CuratedCard />
      </Provider>
    );
    expect(component.find("CuratedCardSkeleton").exists()).toBe(true);
  });

  test("should render CuratedCard when isFetched", () => {
    const component = mount(
      <MockStore>
        <CuratedCard />
      </MockStore>
    );
    expect(component.find("CuratedCardBackground").exists()).toBe(true);
    expect(component.find("Card").exists()).toBe(true);
  });
});
