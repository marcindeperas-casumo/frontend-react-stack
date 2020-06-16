// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import "./SidebarRow.scss";

type Props = {
  text?: string,
  label?: string,
  Icon?: string,
  selected?: boolean,
  secondary?: boolean,
  openNewTab?: boolean,
  link?: string,
  action?: Function,
};

export const SidebarRow = (props: Props) => {
  const {
    text,
    label,
    Icon,
    selected,
    secondary,
    openNewTab,
    link,
    action,
  } = props;

  const rowClasses = classNames(
    "u-font-weight-bold",
    "u-margin--none",
    "u-padding--none",
    "u-position-relative",
    "u-overflow-hidden",
    "u-cursor-pointer",
    "t-color-white",
    {
      "c-sidebar__nav-item--active t-background-teal-50 t-color-white": selected,
      "c-sidebar__nav-item--white t-background-white t-color-grey-50": secondary,
      "c-sidebar__nav-item t-background-purple-80": !secondary,
    }
  );

  return (
    <li className={rowClasses}>
      <a
        data-test-id="sidebar-link"
        className={secondary ? "t-color-grey-50" : "t-color-white"}
        onClick={action}
        href={link || "#"}
        target={openNewTab ? "_blank" : "_self"}
      >
        <Flex
          align="center"
          justify="center"
          direction="vertical"
          className="u-height--full"
        >
          {Icon && (
            <Icon
              className="u-height--3xlg u-width--3xlg u-margin-bottom--sm"
              data-test-id="sidebar-icon"
            />
          )}
          <Text tag="span" data-test-id="sidebar-text">
            {text}
          </Text>
          {label && (
            <Text
              tag="span"
              size="sm"
              className="t-color-teal-50"
              data-test-id="sidebar-text-small"
            >
              {label}
            </Text>
          )}
        </Flex>
      </a>
    </li>
  );
};
