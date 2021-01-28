// @flow
import * as React from "react";
import cx from "classnames";
import { Link, useLocation } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon, SearchIcon, TournamentIcon } from "@casumo/cmp-icons";
import { isTablet, isMobile } from "Components/ResponsiveLayout";
import { useTranslations, useMarketConfig, useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS } from "Src/constants";

const NavLinkDesktop = ({
  Icon,
  text,
  to,
  active,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: ?string,
  to: string,
  active?: boolean,
}) => (
  <Flex.Item>
    <Link to={to}>
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        className={cx("u-padding--sm", {
          "t-color-grey-90": active,
          "t-color-grey-70": !active,
        })}
      >
        <Icon size="md" />
        <Text className="u-font-weight-bold">{text}</Text>
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

const NavLinkMobile = ({
  Icon,
  text,
  to,
  active,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: ?string,
  to: string,
  active?: boolean,
}) => {
  const tablet = isTablet();

  return (
    <Flex.Item>
      <Link
        to={to}
        style={{
          /* kill styles from knockout side */
          borderBottom: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <Flex
          direction="vertical"
          align="center"
          justify="center"
          className={cx(
            tablet ? "u-padding--md u-margin-x--md" : "u-padding u-margin-x",
            {
              "t-color-grey-90": active,
              "t-color-grey-70": !active,
            }
          )}
        >
          <Icon size={tablet ? "md" : "default"} className="u-padding-y" />
          <Text size={tablet ? "sm" : "xs"} className="u-font-weight-bold">
            {text}
          </Text>
        </Flex>
        <Flex
          style={{
            height: 3,
            margin: tablet ? -2 : 0, // this is for compatibility with current ko menu
          }}
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

  if (isMobile() || isTablet()) {
    return (
      <Flex spacing={isTablet() ? "md" : "sm"}>
        {routesProps.map(x => (
          <NavLinkMobile key={x.to} {...x} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex className="o-wrapper " align="center" justify="center">
      <Flex spacing="lg">
        {routesProps.map(x => (
          <NavLinkDesktop key={x.to} {...x} />
        ))}
      </Flex>
    </Flex>
  );
};
