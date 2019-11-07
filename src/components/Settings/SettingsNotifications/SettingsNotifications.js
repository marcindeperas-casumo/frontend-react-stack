// @flow
import React, { PureComponent } from "react";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { SettingsNotificationsToggleRow as ToggleRow } from "./SettingsNotificationsToggleRow";
import { RealityCheckField } from "./SettingsNotificationsFields";

type Props = {
  player: A.PLAYER_CONTACT_SETTINGS_QUERY_player,
  setAdventurerPublicity: (active: boolean) => void,
  setWithdrawalNotifications: (active: boolean) => void,
  setContactByPost: (active: boolean) => void,
  setContactByPhone: (active: boolean) => void,
  setNewsletterSubscription: (active: boolean) => void,
  setSMSNewsletterSubscription: (active: boolean) => void,
  labels: A.NOTIFICATIONS_LABELS_QUERY,
};

export class SettingsNotifications extends PureComponent<Props> {
  render() {
    const {
      setWithdrawalNotifications,
      setContactByPost,
      setContactByPhone,
      setNewsletterSubscription,
      setSMSNewsletterSubscription,
      player: {
        details: {
          contactSettings: {
            withdrawalNotifications,
            subscribedToNewsletters,
            subscribedToSMSNewsletters,
            contactByPhone,
            contactByPost,
          },
        },
        playOk: {
          realityCheck: { canChangeInterval, intervalInMinutes },
        },
      },
      labels: {
        subscriptionsTitle,
        subscriptionsDescription,
        subscriptionsEmailLabel,
        subscriptionsSMSLabel,
        subscriptionsPhoneLabel,
        subscriptionsPostLabel,
        notificationsApprovedWithdrawalsEmailLabel,
        notificationsInGameSessionUpdatesLabel,
        inGameSessionUpdatesOffLabel,
        inGameSessionUpdatesFrequencyLabel,
      },
    } = this.props;

    return (
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop">
        <div className="t-box-shadow--lg@tablet t-box-shadow--lg@desktop">
          <ToggleRow
            label={notificationsApprovedWithdrawalsEmailLabel}
            isEnabled={withdrawalNotifications}
            onChange={setWithdrawalNotifications}
          />
          <RealityCheckField
            enabled={canChangeInterval}
            link="/player/settings/reality-check"
            title={notificationsInGameSessionUpdatesLabel}
            interval={intervalInMinutes}
            frequencyLabel={inGameSessionUpdatesFrequencyLabel}
            frequencyOffLabel={inGameSessionUpdatesOffLabel}
          />
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

          <SubscriptionRow
            label={subscriptionsEmailLabel}
            isEnabled={subscribedToNewsletters}
            onChange={setNewsletterSubscription}
          />

          <SubscriptionRow
            label={subscriptionsSMSLabel}
            isEnabled={subscribedToSMSNewsletters}
            onChange={setSMSNewsletterSubscription}
          />

          <SubscriptionRow
            label={subscriptionsPhoneLabel}
            isEnabled={contactByPhone}
            onChange={setContactByPhone}
          />

          <SubscriptionRow
            label={subscriptionsPostLabel}
            isEnabled={contactByPost}
            onChange={setContactByPost}
          />
        </div>
      </div>
    );
  }
}
