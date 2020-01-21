// @flow

import React from "react";
import { useDispatch } from "react-redux";
import { CrossIcon } from "@casumo/cmp-icons";
import { menuCloseAction } from "Models/menu";
import { useIsSidebarFixed } from "./useIsSidebarFixed";

export const MenuCloseIcon = () => {
  const isSidebarFixed = useIsSidebarFixed();
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
