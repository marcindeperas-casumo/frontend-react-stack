import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import type { iconSizes } from "@casumo/cudl-react-prop-types";
import cx from "classnames";
import * as React from "react";
import { NavLink } from "Components/NavLink";

type TNavbarItemProps = {
  icon: React.ComponentType<{ size: iconSizes }>;
  label: string | undefined;
  to: string;
  showLabel?: boolean;
};

type TProps = {
  items: Array<TNavbarItemProps>;
};

const NavItem = ({ icon, label, to, showLabel = true }: TNavbarItemProps) => {
  const Icon = icon;

  return (
    <Flex.Block>
      <NavLink
        to={to}
        className="text-grey-70"
        activeClassName="text-purple-60"
      >
        <Flex
          align="center"
          justify="center"
          className="u-padding--sm o-flex--vertical@mobile"
        >
          <Icon
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; size: string; }' is not... Remove this comment to see the full error message
            className={cx(
              "u-padding-right u-padding-right--none@mobile u-padding-bottom--sm@mobile"
            )}
            size="md"
          />
          {showLabel && (
            <Text className="u-font-weight-bold u-margin--none">{label}</Text>
          )}
        </Flex>
      </NavLink>
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
