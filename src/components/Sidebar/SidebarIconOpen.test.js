import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { sidebarOpenAction } from "Models/sidebar";
import { SidebarIconOpen } from "./SidebarIconOpen";

jest.mock("Models/sidebar", () => ({
  ...jest.requireActual("../../models/sidebar"),
  sidebarOpenAction: jest.fn(() => ({
    type: "SIDEBAR/OPEN",
  })),
}));

describe("SidebarIconOpen", () => {
  test("onClick should dispatch sidebarOpenAction", () => {
    const rendered = mount(
      <MockStore>
        <SidebarIconOpen />
      </MockStore>
    );

    rendered.find({ "data-test-id": "sidebar-open" }).simulate("click");

    expect(sidebarOpenAction).toHaveBeenCalledTimes(1);
  });
});
