// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import "./SideBarRow.scss";

type Props = {
  text: string,
  smallText: string,
  Icon: string,
  cssClasses: Array<string>,
  link: string,
};

export class SideBarRow extends PureComponent<Props> {
  render() {
    const { text, smallText, Icon, cssClasses, link } = this.props;

    const stylesLi = classNames(
      `u-font-weight-bold`,
      `c-sidebar-nav-li`,
      `t-color-white`,
      `u-margin--none`,
      `u-padding--none`,
      `u-position-relative`,
      `u-overflow-hidden`,
      getLiClassNamesByParam(cssClasses)
    );

    const sylesA = classNames(getAClassNamesByParam(cssClasses));

    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : children;

    return (
      <li className={stylesLi}>
        <ConditionalWrapper
          condition={link}
          wrapper={children => (
            <a data-test-id="sidebar-link" className={sylesA} href={link}>
              {children}
            </a>
          )}
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
            <div data-test-id="sidebar-text t-color-white">{text}</div>
            {smallText && (
              <div
                className="u-font-sm t-color-turquoise"
                data-test-id="sidebar-text-small"
              >
                {smallText}
              </div>
            )}
          </Flex>
        </ConditionalWrapper>
      </li>
    );
  }
}

const getLiClassNamesByParam = cssClassArray => {
  const mapArray = {
    "": "t-background-plum",
    white: "t-background-white, c-sidebar-nav__white",
    selected: "t-background-turquoise",
  };

  if (cssClassArray.length === 0) {
    return "t-background-plum";
  }

  return cssClassArray.map(css => mapArray[css]);
};

const getAClassNamesByParam = cssClassArray => {
  const mapArray = {
    "": "t-color-white",
    white: "t-color-grey-dark-1",
    selected: "t-color-grey-dark-1",
  };

  if (cssClassArray.length === 0) {
    return "t-color-white";
  }

  return cssClassArray.map(css => mapArray[css]);
};
