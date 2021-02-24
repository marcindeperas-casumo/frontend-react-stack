// @flow
import React, { useCallback, useRef, useEffect } from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { ChevronDownIcon } from "@casumo/cmp-icons";
import { useClientRect } from "Utils/hooks";
import { useDropdown } from "./Dropdown.hooks";

import "./Dropdown.scss";

export type TDropdownItemProps = {
  className?: string,
  children: React.Node,
  withBottomBorder?: boolean,
  icon: string,
};

export type TDropdownProps = {
  className?: string,
  children: React.Node,
  triggerLabel?: string,
  triggerIcon?: string,
  showImmediately?: boolean,
  withRoundedCorners?: boolean,
  anchorPosition?: "left" | "right",
};

export const DropdownItem = ({
  className,
  children,
  withBottomBorder = false,
  Icon,
}: TDropdownItemProps) => {
  return (
    <li
      className={cx(
        "u-padding--md",
        "t-border-grey-5",
        { "t-border-bottom": withBottomBorder },
        className
      )}
    >
      {children}
    </li>
  );
};

export const Dropdown = ({
  className,
  children,
  triggerLabel,
  triggerIcon = ChevronDownIcon,
  triggerClassName,
  showImmediately = false,
  withRoundedCorners = true,
  anchorPosition = "right",
}: TDropdownProps) => {
  const dropdownRef = useRef(null);
  const { rect, triggerRef } = useClientRect();
  const { isOpen, setIsOpen } = useDropdown(showImmediately);
  const togggleDropdown = useCallback(() => setIsOpen(!isOpen), [
    isOpen,
    setIsOpen,
  ]);

  const TriggerIcon = triggerIcon;

  const rootClasses = cx(
    "c-dropdown-container",
    "u-display--inline-flex",
    "u-position-relative"
  );

  const dropdownClasses = cx(
    "c-dropdown",
    "u-position-absolute",
    "u-position-absolute",
    "u-padding--none",
    "u-margin-top--sm",
    "t-elevation--30",
    "t-background-white",
    `o-inset-${anchorPosition}--none`,
    {
      "t-border-r--sm": withRoundedCorners,
    },
    className
  );

  const dropdownTriggerClasses = cx(
    "c-dropdown-trigger",
    "u-display--inline-flex",
    "u-cursor--pointer",
    "u-margin--none",
    triggerClassName
  );

  useEffect(() => {
    console.warn("rect", rect);
  }, [rect]);

  return (
    <div className={rootClasses}>
      <Flex
        containeref={triggerRef}
        className={dropdownTriggerClasses}
        onClick={togggleDropdown}
      >
        {triggerLabel && (
          <Flex.Item>
            <Text className="u-margin--none">{triggerLabel}</Text>
          </Flex.Item>
        )}
        {triggerIcon && (
          <Flex.Item>
            <TriggerIcon />
          </Flex.Item>
        )}
      </Flex>
      {isOpen && (
        <ul ref={dropdownRef} className={dropdownClasses}>
          {children}
        </ul>
      )}
    </div>
  );
};
