import { CloseIcon } from "@casumo/cmp-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { sidebarCloseAction } from "Models/sidebar";
import { useIsScreenMinimumTablet } from "Utils/hooks";

export const SidebarIconClose = () => {
  const isSidebarFixed = useIsScreenMinimumTablet();
  const dispatch = useDispatch();

  return (
    !isSidebarFixed && (
      <div
        className="o-position--absolute"
        onClick={() => dispatch(sidebarCloseAction())}
        data-test-id="sidebar-close"
      >
        <CloseIcon size="md" className="u-padding--sm u-cursor--pointer" />
      </div>
    )
  );
};
