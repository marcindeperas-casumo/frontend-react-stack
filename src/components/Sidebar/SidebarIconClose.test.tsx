import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { sidebarCloseAction } from "Models/sidebar";
import { SidebarIconClose } from "./SidebarIconClose";

jest.mock("Models/sidebar", () => ({
  //  apply fix if you know the context (there is no need to add TEE "Ts-Expect-Error" in this case)
  ...jest.requireActual("../../models/sidebar"),
  sidebarCloseAction: jest.fn(() => ({
    type: "SIDEBAR/CLOSE",
  })),
}));

describe("SidebarIconClose", () => {
  test("onClick should dispatch sidebarCloseAction", () => {
    const rendered = mount(
      <MockStore>
        <SidebarIconClose />
      </MockStore>
    );

    rendered.find({ "data-test-id": "sidebar-close" }).simulate("click");

    expect(sidebarCloseAction).toHaveBeenCalledTimes(1);
  });
});
