import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import React from "react";
import classNames from "classnames";
import "./SidebarRow.scss";

type Props = {
  text?: string;
  label?: string;
  Icon?: string;
  selected?: boolean;
  secondary?: boolean;
  openNewTab?: boolean;
  link?: string;
  action?: Function;
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
    "o-position--relative",
    "u-overflow--hidden",
    "u-cursor--pointer",
    "text-white",
    {
      "c-sidebar__nav-item--active bg-teal-50 text-white": selected,
      "c-sidebar__nav-item--white bg-white text-grey-50": secondary,
      "c-sidebar__nav-item bg-purple-80": !secondary,
    }
  );

  return (
    <li className={rowClasses}>
      <a
        data-test-id="sidebar-link"
        className={secondary ? "text-grey-50" : "text-white"}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type '(event:... Remove this comment to see the full error message
        onClick={action}
        href={link || "#"}
        arget={openNewTab ? "_blank" : "_self"}
      >
        <Flex
          align="center"
          justify="center"
          direction="vertical"
          className="u-height--full"
        >
          {Icon && (
            <Icon
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; "data-test-id": string;... Remove this comment to see the full error message
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
              className="text-teal-50"
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
