// @flow
import React, { useCallback } from "react";
import usePortal from "react-cool-portal";
import cx from "classnames";
import type { TDropdownPortalConfig } from "./Dropdown.types";

export const useDropdown = (options: TDropdownPortalConfig) => {
  const { Portal, hide, ...rest } = usePortal({
    ...options,
    containerId: "dd-portal",
    defaultShow: false,
    internalShowHide: false,
    clickOutsideToHide: true,
  });

  const DropdownPortal = useCallback(
    ({ children, isShow }) => (
      <Portal>
        <div
          id="dropdown"
          className={cx("c-dropdown", { "c-dropdown--open": isShow })}
          tabIndex={-1}
        >
          {children}
        </div>
      </Portal>
    ),
    []
  );

  return { DropdownPortal, hide, ...rest };
};
