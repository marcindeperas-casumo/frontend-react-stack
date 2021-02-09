// @flow
import * as React from "react";
import { useMedia } from "react-use";
import {
  TransactionsIcon,
  BetslipIcon,
  UserIcon,
  BellIcon,
  PlayokayIcon,
} from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import {
  MobileAndTablet,
  Desktop,
  getMediaQuery,
  desktopBreakpoint,
} from "Components/ResponsiveLayout";
import { Panel } from "../Panel";
import { Header } from "../Header";
import "./AccountPage.scss";

export function AccountPage() {
  const isDesktop = useMedia(getMediaQuery(desktopBreakpoint));

  return (
    <div className="c-account-page t-background-grey-0 u-padding--3xlg">
      <Header gridArea="header-wallet">Wallet</Header>
      <Panel
        gridArea="recent-transactions"
        Icon={TransactionsIcon}
        title="Recent Transactions"
        seeAllLink={{
          label: "See All",
          url: "/cash/history",
        }}
        roundedTop
        roundedBottom={isDesktop}
      >
        <Desktop>
          recent-transactions
          <br />
          <br />
        </Desktop>
      </Panel>
      <Panel
        gridArea="recent-bets"
        Icon={BetslipIcon}
        title="Recent Bets"
        seeAllLink={{
          label: "See All",
          url: "/cash/history/bets",
        }}
        roundedTop={isDesktop}
        roundedBottom
      >
        <Desktop>recent-bets</Desktop>
      </Panel>

      <Header gridArea="header-settings">Account Settings</Header>
      <Panel
        gridArea="personal-info"
        Icon={UserIcon}
        title="Personal Information"
        seeAllLink={{
          label: "See All",
          url: "/player/settings/account-details",
        }}
        roundedTop
        roundedBottom={isDesktop}
      >
        <Desktop>
          personal-info <br />
          personal-info
        </Desktop>
      </Panel>
      <Panel
        gridArea="notification-settings"
        Icon={BellIcon}
        title="Notification Settings"
        seeAllLink={{
          label: "See All",
          url: "/player/settings/notifications",
        }}
        roundedTop={isDesktop}
        roundedBottom
      >
        <Desktop>
          notification-settings <br />
          notification-settings
        </Desktop>
      </Panel>

      <Header gridArea="header-playokay">Play Okay</Header>
      <div
        className="t-background-white t-border-r"
        style={{ gridArea: "play-okay-info" }}
      >
        play-okay-info
      </div>
      <Panel
        gridArea="active-limits"
        Icon={PlayokayIcon}
        title="Active Limits"
        seeAllLink={{
          label: "View Limits",
          url: "/player/play-okay-settings",
        }}
        roundedTop={isDesktop}
        roundedBottom
      >
        <MobileAndTablet>
          <Flex align="center">
            <Flex.Item>
              <div className="u-height u-width t-background-teal-50 t-border-r--circle" />
            </Flex.Item>
            <Flex.Item>
              <span className="t-color-grey-50">5 active limits</span>
            </Flex.Item>
          </Flex>
        </MobileAndTablet>
        <Desktop>
          active-limits <br />
          active-limits <br />
          active-limits <br />
          active-limits <br />
          active-limits
        </Desktop>
      </Panel>
    </div>
  );
}
