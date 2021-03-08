import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { Sidebar } from "./Sidebar";
import { SidebarRow } from "./SidebarRow";

describe("Sidebar", () => {
  test("should render casumo link", () => {
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'logout' is missing in type '{ username: ... Remove this comment to see the full error message */}
        <Sidebar username="Sumo20" wallet="£987.65" bonus="+ £55.03 Bonus" />
      </MockStore>
    );
    expect(rendered.find({ "data-test-id": "sidebar-logo" }).length).toBe(1);
  });

  test("should render menu rows", () => {
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'logout' is missing in type '{ username: ... Remove this comment to see the full error message */}
        <Sidebar username="Sumo20" wallet="£987.65" bonus="+ £55.03 Bonus" />
      </MockStore>
    );
    expect(rendered.find(SidebarRow).length).toBe(11);
  });
});
