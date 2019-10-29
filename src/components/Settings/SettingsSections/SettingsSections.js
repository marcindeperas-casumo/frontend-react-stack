// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { SettingsSectionsLastLogin } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { logout } from "Services/Logout";

type Props = {
  playerLoginHistory: gPLAYER_LOGIN_HISTORY_QUERY,
  labels: gPLAYER_SECTIONS_LABELS_QUERY,
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
        justify={{
          default: "space-between",
          tablet: "start",
          desktop: "start",
        }}
        direction="vertical"
        className="u-height--screen-minus-navbar u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop"
      >
        <Flex.Item className="u-margin-bottom--lg@tablet u-margin-bottom--lg@desktop t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
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
            size="md"
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
