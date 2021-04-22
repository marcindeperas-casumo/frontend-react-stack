import { ArrowRightIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import React from "react";
import * as A from "Types/apollo";
import { SettingsTranslations } from "Components/Settings/SettingsSections/SettingsSectionsContainer";
import { SettingsSectionsLastLogin } from "Components/Settings/SettingsSections/SettingsSectionsLastLogin";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { isIosNative, isAndroidNative } from "Utils";

const isNotNative = !isAndroidNative() && !isIosNative();

type Props = {
  playerLoginHistory: A.Player_Login_History_Query;
  labels: SettingsTranslations;
  logout: () => void;
};

const SettingsSection = ({ title, description, href }) => (
  <a href={href}>
    <SettingsRow
      text={<SettingsHeadline title={title} description={description} />}
    >
      <ArrowRightIcon className="text-grey-5" />
    </SettingsRow>
  </a>
);

export const SettingsSections = React.memo<Props>((props: Props) => {
  const {
    playerLoginHistory: {
      player: {
        // 0-indexed is the currentSession, 1-indexed is refering to last session
        loginHistory: [currentLogin, previousLogin],
      },
    },
    labels: {
      current_session_length: currentSessionMessage,
      last_session_message: lastSessionMessage,
      account_details_title: accountDetailsTitle,
      account_details_description: accountDetailsDescription,
      notifications_title: notificationsTitle,
      notifications_description: notificationsDescription,
      account_activity: accountActivity,
      logout: logoutLabel,
    },
    logout,
  } = props;

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
        {(currentLogin || previousLogin) && (
          <SettingsSectionsLastLogin
            currentSessionMessageLabel={currentSessionMessage}
            currentTime={currentLogin?.loginTime}
            previousTime={previousLogin?.loginTime}
            lastSessionMessageLabel={lastSessionMessage}
            accountActivityLabel={accountActivity}
          />
        )}
        {isNotNative && (
          <ButtonPrimary
            className="u-margin-bottom--md"
            size="md"
            onClick={logout}
          >
            {logoutLabel || ""}
          </ButtonPrimary>
        )}
      </Flex.Item>
    </Flex>
  );
});
