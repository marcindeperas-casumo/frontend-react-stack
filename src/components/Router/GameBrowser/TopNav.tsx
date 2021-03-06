import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon, SearchIcon, TournamentIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import { Link, useLocation } from "@reach/router";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";
import {
  useTranslations,
  useMarketConfig,
  useLanguage,
  useResize,
} from "Utils/hooks";
import { routeTranslator } from "Utils";
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

export const TopNav = (props: { basepath: string | null }) => {
  const t = useTranslations<{
    search: string;
    games: string;
    reel_races: string;
  }>("new-game-browser.top-nav");

  useResize();

  const reelRacesHidden = useMarketConfig("reelRacesHidden");
  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const { pathname } = useLocation();

  const buildUrl = (route: string) => {
    if (props.basepath) {
      return `/${props.basepath}/${route}`;
    }

    return `/${route}`;
  };
  const gamesUrl = buildUrl(translateRoute(ROUTE_IDS.GAMES));
  const reelRacesUrl = buildUrl(translateRoute(ROUTE_IDS.REEL_RACES));
  const searchUrl = buildUrl(translateRoute(ROUTE_IDS.GAMES_SEARCH));
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
    !reelRacesHidden && {
      Icon: TournamentIcon,
      text: t?.reel_races,
      to: reelRacesUrl,
      active: reelRacesActive,
    },
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
