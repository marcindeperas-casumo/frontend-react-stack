// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { SettingsSectionsLastLogin } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { logout } from "Services/Logout";

type Props = {
  playerLoginHistory: PLAYER_LOGIN_HISTORY_QUERY,
  labels: PLAYER_SECTIONS_LABELS_QUERY,
};

const SettingsSection = ({ title, description, href }) => (
  <a href={href}>
    <SettingsRow
      text={<SettingsHeadline title={title} description={description} />}
    >
      <DirectionRightIcon className="t-color-grey-light-1" />
    </SettingsRow>
  </a>
);

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

    return (
      <Flex
        justify="space-between"
        direction="vertical"
        className="u-height--screen-minus-navbar"
      >
        <Flex.Item>
          <SettingsSection
            title={accountDetailsTitle}
            description={accountDetailsDescription}
            href="/player/settings/account-details"
          />
          <SettingsSection
            title={notificationsTitle}
            description={notificationsDescription}
            href="/player/settings/notifications"
          />
        </Flex.Item>
        <Flex.Item className="u-text-align-center">
          {lastLogin && (
            <SettingsSectionsLastLogin
              currentSessionMessageLabel={currentSessionMessage}
              time={lastLogin.loginTime}
              lastSessionMessageLabel={lastSessionMessage}
              accountActivityLabel={accountActivity}
            />
          )}
          <Button
            className="u-margin-bottom--md"
            onClick={logout}
            variant="primary"
          >
            {logoutLabel}
          </Button>
        </Flex.Item>
      </Flex>
    );
  }
}
