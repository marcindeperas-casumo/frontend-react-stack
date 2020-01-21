// @flow

import React from "react";
import { useDispatch } from "react-redux";
import { CrossIcon } from "@casumo/cmp-icons";
import { menuCloseAction } from "Models/menu";
import { useIsScreenMinimumTablet } from "Utils/hooks";

export const SidebarCloseIcon = () => {
  const isSidebarFixed = useIsScreenMinimumTablet();
  const dispatch = useDispatch();

  return (
    !isSidebarFixed && (
      <div
        className="u-position-absolute"
        onClick={() => dispatch(menuCloseAction())}
      >
        <CrossIcon
          size="md"
          className="u-padding-y--xlg u-padding-x--md u-cursor-pointer"
        />
      </div>
    )
  );
};
