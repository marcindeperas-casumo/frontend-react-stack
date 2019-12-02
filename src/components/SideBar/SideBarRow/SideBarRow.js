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

    const styles = classNames(
      `u-font-weight-bold`,
      `c-sidebar-nav-li`,
      `t-color-white`,
      `t-background-plum`,
      `u-margin--none`,
      `u-padding--none`,
      `u-position-relative`,
      `u-overflow-hidden`,
      cssClasses.map(t => `c-sidebar-nav__${t}`).join(` `)
    );

    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : children;

    return (
      <li className={styles}>
        <ConditionalWrapper
          condition={link}
          wrapper={children => (
            <a data-test-id="sidebar-link" href={link}>
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
            <div data-test-id="sidebar-text">{text}</div>
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
