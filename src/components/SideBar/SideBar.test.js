import React from "react";
import { shallow } from "enzyme";
import { SideBar } from "Components/SideBar";
import { menu, menuShort, walletUK, username } from "./__mocks__/SideBar.mock";

describe("SideBar", () => {
  test("should render casumo link", () => {
    const rendered = shallow(
      <SideBar username={username} wallet={walletUK} menu={menu} />
    );
    expect(rendered.find(".c-sidebar-logo").length).toBe(1);
  });

  test("should render menu rows", () => {
    const rendered = shallow(
      <SideBar username={username} wallet={walletUK} menu={menu} />
    );
    expect(rendered.find("SideBarRow").length).toBe(menu.length + 3);
  });

  test("should render 3 rows and 1 extra menu position", () => {
    const rendered = shallow(
      <SideBar username={username} wallet={walletUK} menu={menuShort} />
    );
    expect(rendered.find("SideBarRow").length).toBe(menuShort.length + 3);
  });
});
