// @flow
import React, { PureComponent } from "react";
import * as A from "Types/apollo";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { RealityCheckField } from "./SettingsNotificationsFields";
import { WithdrawalNotificationsContainer } from "./WithdrawalNotificationsContainer";
import { NewsletterSubscriptionContainer } from "./NewsletterSubscriptionContainer";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { ContactByPostContainer } from "./ContactByPostContainer";
import { ContactByPhoneContainer } from "./ContactByPhoneContainer";

type Props = {
  player: A.PLAYER_CONTACT_SETTINGS_QUERY_player,
  labels: A.NOTIFICATIONS_LABELS_QUERY,
  isDGOJ: boolean,
};

export class SettingsNotifications extends PureComponent<Props> {
  render() {
    const {
      player: {
        id: playerId,
        details: {
          contactSettings: { withdrawalNotifications },
        },
        playOk: {
          realityCheck: { canChangeInterval, intervalInMinutes },
        },
      },
      labels: {
        subscriptionsTitle,
        subscriptionsDescription,
        notificationsApprovedWithdrawalsEmailLabel,
        notificationsInGameSessionUpdatesLabel,
        inGameSessionUpdatesOffLabel,
        inGameSessionUpdatesFrequencyLabel,
      },
      isDGOJ,
    } = this.props;

    return (
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop">
        <div className="t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
          <WithdrawalNotificationsContainer
            playerId={playerId}
            withdrawalNotifications={withdrawalNotifications}
            notificationsApprovedWithdrawalsEmailLabel={
              notificationsApprovedWithdrawalsEmailLabel
            }
          />
          {!isDGOJ && (
            <RealityCheckField
              enabled={canChangeInterval}
              link="/player/settings/reality-check"
              title={notificationsInGameSessionUpdatesLabel}
              interval={intervalInMinutes}
              frequencyLabel={inGameSessionUpdatesFrequencyLabel}
              frequencyOffLabel={inGameSessionUpdatesOffLabel}
            />
          )}
        </div>
        <div className="t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
          <SettingsRow
            text={
              <SettingsHeadline
                title={subscriptionsTitle}
                description={subscriptionsDescription}
              />
            }
            className="t-border-bottom--none u-margin-top"
          />

          <NewsletterSubscriptionContainer />

          <SmsSubscriptionContainer />

          <ContactByPhoneContainer />

          <ContactByPostContainer />
        </div>
      </div>
    );
  }
}
