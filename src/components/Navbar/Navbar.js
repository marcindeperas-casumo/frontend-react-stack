// @flow
import * as React from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { isMobile } from "Components/ResponsiveLayout";

type NavbarItemProps = {
  Icon: React.StatelessFunctionalComponent<any>,
  text: ?string,
  to: string,
  active?: boolean,
};

type Props = {
  items: Array<NavbarItemProps>,
  sticky?: boolean,
};

const NavItem = ({ Icon, text, to, active }: NavbarItemProps) => {
  const direction = isMobile() ? "vertical" : "horizontal";
  return (
    <Flex.Block>
      <Link to={to}>
        <Flex
          direction={direction}
          align="center"
          justify="center"
          className={cx("u-padding--sm", {
            "t-color-purple-60": active,
            "t-color-grey-70": !active,
          })}
        >
          <Icon
            className={cx({
              "u-padding-right": !isMobile(),
              "u-padding-bottom--sm": isMobile(),
            })}
            size="md"
          />
          <Text className="u-font-weight-bold u-margin--none">{text}</Text>
        </Flex>
      </Link>
    </Flex.Block>
  );
};

export const Navbar = ({ items }: Props) => {
  return (
    <Flex spacing="lg">
      {items.map(x => (
        <NavItem key={x.to} {...x} />
      ))}
    </Flex>
  );
};
