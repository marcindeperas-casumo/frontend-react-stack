// @flow
import React, { useCallback, useRef } from "react";
import cx from "classnames";
import { useDropdown } from "./Dropdown.hooks";

import "./Dropdown.scss";

export type TDropdownItemProps = {
  className?: string,
  children: React.Node,
  withBottomBorder?: boolean,
};

export type TDropdownProps = {
  className?: string,
  children: React.Node,
  label?: string,
  showImmediately?: boolean,
  withRoundedCorners?: boolean,
  anchorPosition?: "left" | "right",
};

export const DropdownItem = ({
  className,
  children,
  withBottomBorder = true,
}) => {
  return (
    <div
      className={cx(
        "u-padding--lg u-padding-y--md",
        { "t-border-bottom": withBottomBorder },
        className
      )}
    >
      {children}
    </div>
  );
};

export const Dropdown = ({
  className,
  children,
  label,
  showImmediately = false,
  withRoundedCorners = true,
  anchorPosition = "right",
}: TProps) => {
  const dropdownRef = useRef(null);
  const { isOpen, setIsOpen } = useDropdown(showImmediately);
  const open = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const dropdownClasses = cx(
    "c-dropdown",
    "u-position-absolute",
    "u-margin-top--md",
    "t-background-red-30",
    "t-border-r--sm",
    `o-inset-${anchorPosition}--none`,
    {
      "t-border-radius-sm": withRoundedCorners,
    },
    className
  );

  return (
    <>
      <div className="c-dropdown-trigger" onClick={open}>
        {label}
      </div>

      <div className="c-dropdown-container u-position-relative">
        {isOpen && (
          <div ref={dropdownRef} className={dropdownClasses}>
            {children}
          </div>
        )}
      </div>
    </>
  );
};
