// @flow

import React from "react";
import { useDispatch } from "react-redux";
import { MenuIcon } from "@casumo/cmp-icons";
import { sidebarOpenAction } from "Models/sidebar";
import { useIsScreenMinimumTablet } from "Utils/hooks";

export const SidebarIconOpen = () => {
  const isSidebarFixed = useIsScreenMinimumTablet();
  const dispatch = useDispatch();

  return (
    !isSidebarFixed && (
      <div
        onClick={() => dispatch(sidebarOpenAction())}
        data-test-id="sidebar-open"
      >
        <MenuIcon className="u-padding-x u-cursor-pointer" />
      </div>
    )
  );
};
