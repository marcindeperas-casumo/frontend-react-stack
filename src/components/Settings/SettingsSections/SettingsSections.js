// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { SettingsSectionsLastLogin } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";

type Props = {
  playerLoginHistory: A.PLAYER_LOGIN_HISTORY_QUERY,
  labels: {
    accountDetailsTitle: ?string,
    accountDetailsDescription: ?string,
    notificationsTitle: ?string,
    notificationsDescription: ?string,
    currentSessionMessage: ?string,
    lastSessionMessage: ?string,
    accountActivity: ?string,
    logout: ?string,
  },
  logout: () => void,
};

const SettingsSection = ({ title, description, href }) => (
  <a href={href}>
    <SettingsRow
      text={<SettingsHeadline title={title} description={description} />}
    >
      <DirectionRightIcon className="t-color-grey-5" />
    </SettingsRow>
  </a>
);

export class SettingsSections extends PureComponent<Props> {
  render() {
    const {
      playerLoginHistory: {
        player: {
          // 0-indexed is the currentSession, 1-indexed is refering to last session
          loginHistory: [, previousLogin],
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
      logout,
    } = this.props;

    return (
      <Flex
        justify={{
          default: "space-between",
          tablet: "start",
          desktop: "start",
        }}
        direction="vertical"
        className="u-height--screen-minus-navbar u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop"
      >
        <Flex.Item className="u-margin-bottom--lg@tablet u-margin-bottom--lg@desktop t-elevation--30@tablet t-elevation--30@desktop">
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
          {previousLogin && (
            <SettingsSectionsLastLogin
              currentSessionMessageLabel={currentSessionMessage}
              time={previousLogin.loginTime}
              lastSessionMessageLabel={lastSessionMessage}
              accountActivityLabel={accountActivity}
            />
          )}
          <ButtonPrimary
            className="u-margin-bottom--md"
            size="md"
            onClick={logout}
          >
            {logoutLabel || ""}
          </ButtonPrimary>
        </Flex.Item>
      </Flex>
    );
  }
}
