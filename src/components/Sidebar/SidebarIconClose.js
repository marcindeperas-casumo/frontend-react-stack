// @flow

import React from "react";
import { useDispatch } from "react-redux";
import { CrossIcon } from "@casumo/cmp-icons";
import { sidebarCloseAction } from "Models/sidebar";
import { useIsScreenMinimumTablet } from "Utils/hooks";

export const SidebarIconClose = () => {
  const isSidebarFixed = useIsScreenMinimumTablet();
  const dispatch = useDispatch();

  return (
    !isSidebarFixed && (
      <div
        className="u-position-absolute"
        onClick={() => dispatch(sidebarCloseAction())}
        data-test-id="sidebar-close"
      >
        <CrossIcon
          size="md"
          className="u-padding-y--xlg u-padding-x--md u-cursor-pointer"
        />
      </div>
    )
  );
};
