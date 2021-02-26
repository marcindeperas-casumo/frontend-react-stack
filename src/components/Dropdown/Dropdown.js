// @flow
import * as React from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { ChevronDownIcon } from "@casumo/cmp-icons";
import type { iconSizes } from "@casumo/cudl-react-prop-types";
import { useDropdown } from "./Dropdown.hooks";

import "./Dropdown.scss";

export type TDropdownItemContentProps = {
  Icon?: React.StatelessFunctionalComponent<{ size?: iconSizes }>,
  DescriptionIcon?: React.StatelessFunctionalComponent<{ size?: iconSizes }>,
  label: string,
  description?: string,
};

export type TDropdownItemProps = {
  className?: string,
  children: React.Node,
  withBottomBorder?: boolean,
  onClick?: () => void,
};

export type TDropdownProps = {
  className?: string,
  children: React.Node,
  triggerLabel?: string,
  TriggerIcon?: React.StatelessFunctionalComponent<{ size?: iconSizes }>,
  triggerClassName?: string,
  showImmediately?: boolean,
  withRoundedCorners?: boolean,
  anchorPosition?: "left" | "right",
};

export const DropdownIconLink = ({
  to,
  ...rest
}: TDropdownItemContentProps & {
  to: string,
}) => (
  <Link to={to}>
    <DropdownItemContent {...rest} />
  </Link>
);

export const DropdownItemContent = ({
  Icon,
  DescriptionIcon,
  label,
  description,
}: TDropdownItemContentProps) => (
  <Flex align="center" spacing="md">
    {Icon && (
      <Flex.Item>
        <Icon />
      </Flex.Item>
    )}
    <Flex.Item>
      <Flex direction="vertical">
        <Flex.Item>
          <Text className="u-margin--none u-font-weight-bold">{label}</Text>
        </Flex.Item>
        {description && (
          <Flex.Item>
            {DescriptionIcon && <DescriptionIcon size="sm" />}
            <Text
              tag="span"
              className="u-margin-left--sm u-font-sm t-color-grey-50"
            >
              {description}
            </Text>
          </Flex.Item>
        )}
      </Flex>
    </Flex.Item>
  </Flex>
);

export const DropdownItem = ({
  className,
  children,
  withBottomBorder = false,
  onClick,
}: TDropdownItemProps) => {
  return (
    <li
      className={cx(
        "u-padding--md",
        "t-border-grey-5",
        { "t-border-bottom": withBottomBorder },
        className
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export const Dropdown = ({
  className,
  children,
  triggerLabel,
  TriggerIcon = ChevronDownIcon,
  triggerClassName,
  showImmediately = false,
  withRoundedCorners = true,
  anchorPosition = "right",
}: TDropdownProps) => {
  const dropdownRef = React.useRef(null);
  const { isOpen, setIsOpen } = useDropdown(showImmediately, dropdownRef);
  const togggleDropdown = React.useCallback(() => setIsOpen(!isOpen), [
    isOpen,
    setIsOpen,
  ]);

  const rootClasses = cx(
    "c-dropdown-container",
    "u-display--inline-flex",
    "u-position-relative"
  );

  const dropdownClasses = cx(
    "c-dropdown",
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

  return (
    <div className={rootClasses}>
      <Flex className={dropdownTriggerClasses} onClick={togggleDropdown}>
        {triggerLabel && (
          <Flex.Item>
            <Text className="u-margin--none">{triggerLabel}</Text>
          </Flex.Item>
        )}
        {TriggerIcon && (
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
