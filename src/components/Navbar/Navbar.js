// @flow
import * as React from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type TNavbarItemProps = {
  icon: React.ComponentType<{ size: iconSizes }>,
  label: ?string,
  to: string,
  showLabel?: boolean,
};

type TProps = {
  items: Array<TNavbarItemProps>,
};

const getLinkClasses = isCurrent => {
  return {
    className: cx({
      "t-color-purple-60": isCurrent,
      "t-color-grey-70": !isCurrent,
    }),
  };
};

const NavItem = ({ icon, label, to, showLabel = true }: TNavbarItemProps) => {
  const Icon = icon;

  return (
    <Flex.Block>
      <Link to={to} getProps={({ isCurrent }) => getLinkClasses(isCurrent)}>
        <Flex
          align="center"
          justify="center"
          className="u-padding--sm o-flex--vertical@mobile"
        >
          <Icon
            className={cx(
              "u-padding-right u-padding-right--none@mobile u-padding-bottom--sm@mobile"
            )}
            size="md"
          />
          {showLabel && (
            <Text className="u-font-weight-bold u-margin--none">{label}</Text>
          )}
        </Flex>
      </Link>
    </Flex.Block>
  );
};

export const Navbar = ({ items }: TProps) => {
  return (
    <Flex spacing="lg">
      {items.map((item, i) => (
        <NavItem key={i} {...item} />
      ))}
    </Flex>
  );
};
