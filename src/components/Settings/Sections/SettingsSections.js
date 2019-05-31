// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import Timer from "./node_modules/Components/Timer";
import { ContentReplacer } from "./node_modules/Components/ContentReplacer";
import { SettingsRow } from "./node_modules/Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "./node_modules/Components/Settings/SettingsHeadline/SettingsHeadline";
import "./SettingsSections.scss";

type Props = {
  playerQuery: PLAYER_SECTIONS_QUERY,
  labels: PLAYER_SECTIONS_LABELS_QUERY,
};

const BottomBar = props => (
  <div className="c-bottom-bar u-text-align-center u-padding--lg">
    <div>
      {props.currentSessionMessage}&nbsp;
      <Timer
        startTime={props.lastLogin.loginTime}
        render={state => (
          <strong>
            {state.hours}:{state.minutes}:{state.seconds}
          </strong>
        )}
      />
    </div>
    <ContentReplacer
      value={props.lastSessionMessage}
      replacements={{
        lastLoginDate: props.formatableLoginDate.toLocaleString(
          DateTime.DATE_FULL
        ),
        lastLoginTime: props.formatableLoginDate.toLocaleString(
          DateTime.TIME_24_SIMPLE
        ),
      }}
    />
  </div>
);

export class SettingsSections extends PureComponent<Props> {
  render() {
    const {
      playerQuery: {
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
      <>
        <AccountDetailsLink />
        <NotificationsLink />

        {lastLogin && (
          <BottomBar
            currentSessionMessage={currentSessionMessage}
            lastLogin={lastLogin}
            lastSessionMessage={lastSessionMessage}
            formatableLoginDate={DateTime.fromMillis(lastLogin.loginTime)}
          />
        )}
      </>
    );
  }
}
