// @flow

import React from "react";
import { useDispatch } from "react-redux";
import { MenuIcon } from "@casumo/cmp-icons";
import { menuOpenAction } from "Models/menu";
import { useIsSidebarFixed } from "./useIsSidebarFixed";

export const MenuOpenIcon = () => {
  const isSidebarFixed = useIsSidebarFixed();
  const dispatch = useDispatch();

  return (
    !isSidebarFixed && (
      <div onClick={() => dispatch(menuOpenAction())}>
        <MenuIcon className="u-padding-x u-cursor-pointer" />
      </div>
    )
  );
};
