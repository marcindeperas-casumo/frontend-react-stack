// @flow
import React, { PureComponent } from "react";
import * as A from "Types/apollo";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { NotificationTranslations } from "Components/Settings/SettingsNotifications/SettingsNotificationsContainer";
import { RealityCheckField } from "./SettingsNotificationsFields";
import { WithdrawalNotificationsContainer } from "./WithdrawalNotificationsContainer";
import { NewsletterSubscriptionContainer } from "./NewsletterSubscriptionContainer";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { ContactByPostContainer } from "./ContactByPostContainer";
import { ContactByPhoneContainer } from "./ContactByPhoneContainer";
import { MarketingCrossSellSubscriptionContainer } from "./MarketingCrossSellSubscriptionContainer";

type Props = {
  player: A.PLAYER_CONTACT_SETTINGS_QUERY_player,
  labels: NotificationTranslations,
  isDGOJ: boolean,
};

export class SettingsNotifications extends PureComponent<Props> {
  render() {
    const {
      player: {
        playOk: {
          realityCheck: { canChangeInterval, intervalInMinutes },
        },
      },
      labels: {
        subscriptions_title: subscriptionsTitle,
        subscriptions_description: subscriptionsDescription,
        notifications_ingame_session_updates_label: notificationsInGameSessionUpdatesLabel,
        in_game_updates_off_label: inGameSessionUpdatesOffLabel,
        in_game_updates_options_label: inGameSessionUpdatesFrequencyLabel,
      },
      isDGOJ,
    } = this.props;

    return (
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop">
        <div className="t-elevation--30@tablet t-elevation--30@desktop">
          <WithdrawalNotificationsContainer />

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
        <div className="t-elevation--30@tablet t-elevation--30@desktop">
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

          <MarketingCrossSellSubscriptionContainer />
        </div>
      </div>
    );
  }
}
