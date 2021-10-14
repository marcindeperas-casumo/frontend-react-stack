import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { QuestionMarkIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import { Link } from "@reach/router";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";
import { useResize, useTranslatedUrl } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export const NavLinkItem = ({
  Icon,
  text,
  to,
  active,
}: {
  Icon: React.ComponentType<{ size: string; className: string }>;
  text: string | undefined;
  to: string;
  active?: boolean;
}) => {
  const navItemSpacing = isDesktop() ? "u-padding--sm" : "u-padding";
  const navItemIconSize = isDesktop() ? "md" : "default";
  const navItemIconClass = isDesktop() ? "" : "u-padding-y";
  const navItemTextSize = isDesktop() ? "default" : "xs";
  const navItemLinkStyleResetForKO = !isDesktop()
    ? {
        borderBottom: "none",
        padding: 0,
        margin: 0,
      }
    : {};
  return (
    <Flex.Item
      className={cx("c-top-nav--item", {
        active,
      })}
    >
      <Link to={to} style={navItemLinkStyleResetForKO}>
        <Flex
          direction="vertical"
          align="center"
          justify="center"
          className={cx("c-top-nav--item", navItemSpacing, {
            "text-grey-90": active,
            "text-grey-70": !active,
          })}
        >
          <Icon size={navItemIconSize} className={navItemIconClass} />
          <Text size={navItemTextSize} className="u-font-weight-bold">
            {text}
          </Text>
        </Flex>
        <Flex
          style={{ height: 3 }}
          className={cx("t-border-r", {
            "bg-purple-60": active,
          })}
        />
      </Link>
    </Flex.Item>
  );
};

export const JackpotsTopNav = (props: {
  basepath: string | null;
  jackpotSlug: string | null;
}) => {
  useResize();

  const buildUrl = (route: string) => {
    return `/${route}`;
  };

  const explainerUrl = buildUrl(
    useTranslatedUrl(ROUTE_IDS.JACKPOT_EXPLAINER, {
      slug: props.jackpotSlug,
    })
  );

  const routesProps = [
    {
      Icon: QuestionMarkIcon,
      text: "",
      to: explainerUrl,
      active: false,
    },
  ].filter(Boolean);

  // eslint-disable-next-line no-nested-ternary
  const navItemSpacing = isTablet() ? "md" : isDesktop() ? "lg" : "sm";

  return (
    <Flex className="o-wrapper " spacing={navItemSpacing}>
      {routesProps.map(x => (
        <NavLinkItem key={x.to} {...x} />
      ))}
    </Flex>
  );
};
