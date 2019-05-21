// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";
import Row from "Components/Settings/Row";
import Headline from "Components/Settings/Headline";
import Link from "Components/Settings/Link";
import "./Sections.scss";

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

class Sections extends PureComponent<Props> {
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

    const AccountDetails = () => (
      <Link
        target="/player/settings/account-details"
        label={
          <Row
            text={
              <Headline
                title={accountDetailsTitle}
                description={accountDetailsDescription}
              />
            }
            action={<DirectionRightIcon className="t-color-grey-light-1" />}
          />
        }
      />
    );

    const Notifications = () => (
      <Link
        target="/player/settings/notifications"
        label={
          <Row
            text={
              <Headline
                title={notificationsTitle}
                description={notificationsDescription}
              />
            }
            action={<DirectionRightIcon className="t-color-grey-light-1" />}
          />
        }
      />
    );

    return (
      <>
        <AccountDetails />
        <Notifications />

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

export default Sections;
