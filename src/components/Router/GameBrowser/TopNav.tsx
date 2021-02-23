// @flow
import * as React from "react";
import cx from "classnames";
import { Link, useLocation } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon, SearchIcon, TournamentIcon } from "@casumo/cmp-icons";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";
import {
  useTranslations,
  useMarketConfig,
  useLanguage,
  useResize,
} from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS } from "Src/constants";

const NavLinkItem = ({
  Icon,
  text,
  to,
  active,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Stateles... Remove this comment to see the full error message
  Icon: React.StatelessFunctionalComponent<any>,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  text: ?string,
  to: string,
  active?: boolean,
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
            "t-color-grey-90": active,
            "t-color-grey-70": !active,
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
            "t-background-purple-60": active,
          })}
        />
      </Link>
    </Flex.Item>
  );
};

export const TopNav = (props: { basepath: string }) => {
  const t = useTranslations<{
    search: string,
    games: string,
    reel_races: string,
  }>("new-game-browser.top-nav");

  useResize();

  const reelRacesHidden = useMarketConfig("reelRacesHidden");
  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const { pathname } = useLocation();
  const gamesUrl = `/${props.basepath}/${translateRoute(ROUTE_IDS.GAMES)}`;
  const reelRacesUrl = `/${props.basepath}/${translateRoute(
    ROUTE_IDS.REEL_RACES
  )}`;
  const searchUrl = `/${props.basepath}/${translateRoute(
    ROUTE_IDS.GAMES_SEARCH
  )}`;
  const reelRacesActive = pathname === reelRacesUrl;
  const searchActive = pathname === searchUrl;
  const gamesActive = !searchActive && !reelRacesActive;

  const routesProps = [
    {
      Icon: PlayIcon,
      text: t?.games,
      to: gamesUrl,
      active: gamesActive,
    },
    // writing it as "!reelRacesHidden && { ... }," upsets flow
    !reelRacesHidden
      ? {
          Icon: TournamentIcon,
          text: t?.reel_races,
          to: reelRacesUrl,
          active: reelRacesActive,
        }
      : null,
    {
      Icon: SearchIcon,
      text: t?.search,
      to: searchUrl,
      active: searchActive,
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
