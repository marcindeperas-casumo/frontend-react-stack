// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { SettingsSectionsLastLogin as LastLoginBar } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";

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
        logout,
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
        {lastLogin && (
          <Flex.Item>
            <LastLoginBar
              currentSessionMessageLabel={currentSessionMessage}
              time={lastLogin.loginTime}
              lastSessionMessageLabel={lastSessionMessage}
              accountActivityLabel={accountActivity}
              logoutLabel={logout}
            />
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
