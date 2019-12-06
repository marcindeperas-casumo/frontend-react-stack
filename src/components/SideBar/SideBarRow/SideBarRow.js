// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import "./SideBarRow.scss";

type Props = {
  text: string,
  label?: string,
  Icon?: string,
  isSelected?: boolean,
  isWhiteRow?: boolean,
  style?: string,
  link?: string,
  action?: Function,
};

export class SideBarRow extends PureComponent<Props> {
  render() {
    const {
      text,
      label,
      Icon,
      isSelected,
      isWhiteRow,
      link,
      action,
    } = this.props;

    const stylesLi = classNames(
      `u-font-weight-bold`,
      `c-sidebar-nav-li`,
      `u-margin--none`,
      `u-padding--none`,
      `u-position-relative`,
      `u-overflow-hidden`,
      getLiClassNamesByParam(isSelected, isWhiteRow)
    );

    return (
      <li className={stylesLi} data-test-id="sidebar-li">
        <a
          data-test-id="sidebar-link"
          className={getAClassNamesByParam(isSelected, isWhiteRow)}
          onClick={action}
          href={link}
        >
          <Flex
            align="center"
            justify="center"
            direction="vertical"
            className="u-height--full"
          >
            {Icon && (
              <Icon
                className="u-height--3xlg u-width--3xlg"
                data-test-id="sidebar-icon"
              />
            )}
            <div data-test-id="sidebar-text">{text}</div>
            {label && (
              <div
                className="u-font-sm t-color-turquoise"
                data-test-id="sidebar-text-small"
              >
                {label}
              </div>
            )}
          </Flex>
        </a>
      </li>
    );
  }
}

const getLiClassNamesByParam = (
  isSelected: boolean = false,
  isWhiteRow: boolean = false
) => {
  if (isSelected) {
    return "t-background-turquoise t-color-white";
  }
  if (isWhiteRow) {
    return "t-background-white c-sidebar-nav__white t-color-grey-dark-1";
  }
  return "t-background-plum t-color-white";
};

const getAClassNamesByParam = (
  isSelected: boolean = false,
  isWhiteRow: boolean = false
) => {
  if (isSelected) {
    return "t-color-white";
  }
  if (isWhiteRow) {
    return "t-color-grey-dark-1";
  }
  return "t-color-white";
};
