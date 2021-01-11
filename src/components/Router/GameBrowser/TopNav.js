// @flow
import * as React from "react";
import cx from "classnames";
import { Link, useMatch } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon, SearchIcon, TournamentIcon } from "@casumo/cmp-icons";
import { isTablet, isMobile } from "Components/ResponsiveLayout";
import { useTranslations, useMarketConfig } from "Utils/hooks";

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

export const TopNav = () => {
  const t = useTranslations<{
    search: string,
    games: string,
    reel_races: string,
  }>("new-game-browser.top-nav");
  const reelRacesHidden = useMarketConfig("reelRacesHidden");
  const searchActive = Boolean(useMatch("search"));
  const reelRacesActive = Boolean(useMatch("reel-races"));
  const gamesActive = !searchActive && !reelRacesActive;

  if (isMobile() || isTablet()) {
    return (
      <Flex spacing={isTablet() ? "md" : "sm"}>
        <NavLinkMobile
          Icon={PlayIcon}
          text={t?.games}
          to="top"
          active={gamesActive}
        />
        {!reelRacesHidden && (
          <NavLinkMobile
            Icon={TournamentIcon}
            text={t?.reel_races}
            to={`/reel-races`}
            active={reelRacesActive}
          />
        )}
        <NavLinkMobile
          Icon={SearchIcon}
          text={t?.search}
          to="search"
          active={searchActive}
        />
      </Flex>
    );
  }

  return (
    <Flex className="o-wrapper " align="center" justify="center">
      <Flex spacing="lg">
        <NavLinkDesktop
          Icon={PlayIcon}
          text={t?.games}
          to="."
          active={!searchActive}
        />
        {!reelRacesHidden && (
          <NavLinkDesktop
            Icon={TournamentIcon}
            text={t?.reel_races}
            to={`/reel-races`}
          />
        )}
        <NavLinkDesktop
          Icon={SearchIcon}
          text={t?.search}
          to="search"
          active={searchActive}
        />
      </Flex>
    </Flex>
  );
};
