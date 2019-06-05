// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SettingsSectionsLastLogin as LastLoginBar } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { logout } from "Services/Logout";

type Props = {
  playerLoginHistory: PLAYER_LOGIN_HISTORY_QUERY,
  labels: PLAYER_SECTIONS_LABELS_QUERY,
};

export class SettingsSections extends PureComponent<Props> {
  render() {
    const {
      playerLoginHistory: {
        player: {
          loginHistory: [lastLogin],
        },
      },
      labels: {
        currentSessionMessage,
        lastSessionMessage,
        accountDetailsTitle,
        accountDetailsDescription,
        notificationsTitle,
        notificationsDescription,
        accountActivity,
        logout: logoutLabel,
      },
    } = this.props;

    const AccountDetailsLink = () => (
      <a href="/player/settings/account-details">
        <SettingsRow
          text={
            <SettingsHeadline
              title={accountDetailsTitle}
              description={accountDetailsDescription}
            />
          }
        >
          <DirectionRightIcon className="t-color-grey-light-1" />
        </SettingsRow>
      </a>
    );

    const NotificationsLink = () => (
      <a href="/player/settings/notifications">
        <SettingsRow
          text={
            <SettingsHeadline
              title={notificationsTitle}
              description={notificationsDescription}
            />
          }
        >
          <DirectionRightIcon className="t-color-grey-light-1" />
        </SettingsRow>
      </a>
    );

    const LogoutButton = () => (
      <a
        className="u-padding--xlg u-margin-top--md u-text-align-center t-background-white u-cursor-pointer u-display--block"
        onClick={logout}
      >
        <Text tag="p" className="t-color-red u-font-weight-bold">
          {logoutLabel}
        </Text>
      </a>
    );

    return (
      <Flex
        justify="space-between"
        direction="vertical"
        className="u-height--screen-minus-navbar"
      >
        <Flex.Item>
          <AccountDetailsLink />
          <NotificationsLink />
        </Flex.Item>
        <Flex.Item>
          {lastLogin && (
            <LastLoginBar
              currentSessionMessageLabel={currentSessionMessage}
              time={lastLogin.loginTime}
              lastSessionMessageLabel={lastSessionMessage}
              accountActivityLabel={accountActivity}
            />
          )}
          <LogoutButton />
        </Flex.Item>
      </Flex>
    );
  }
}
