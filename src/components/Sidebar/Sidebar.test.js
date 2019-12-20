import React from "react";
import { mount } from "enzyme";
import { Sidebar } from "Components/Sidebar/Sidebar";
import MockStore from "Components/MockStore";

describe("Sidebar", () => {
  test("should render casumo link", () => {
    const rendered = mount(
      <MockStore>
        <Sidebar username="Sumo20" wallet="£987.65" bonus="+ £55.03 Bonus" />
      </MockStore>
    );
    expect(rendered.find({ "data-test-id": "sidebar-logo" }).length).toBe(1);
  });

  test("should render menu rows", () => {
    const rendered = mount(
      <MockStore>
        <Sidebar username="Sumo20" wallet="£987.65" bonus="+ £55.03 Bonus" />
      </MockStore>
    );
    expect(rendered.find("SidebarRow").length).toBe(11);
  });
});
