// @flow
import React, { PureComponent } from "react";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { NotificationsSubscriptionRow as SubscriptionRow } from "./NotificationsSubscriptionRow";
import { NotificationsToggleRow as ToggleRow } from "./NotificationsToggleRow";
import { RealityCheckField } from "./NotificationsFields";

type Props = {
  player: PLAYER_CONTACT_SETTINGS_QUERY_player,
  setAdventurerPublicity: (active: boolean) => void,
  setWithdrawalNotifications: (active: boolean) => void,
  setContactByPost: (active: boolean) => void,
  setContactByPhone: (active: boolean) => void,
  setNewsletterSubscription: (active: boolean) => void,
  setSMSNewsletterSubscription: (active: boolean) => void,
  labels: NOTIFICATIONS_LABELS_QUERY,
};

export class Notifications extends PureComponent<Props> {
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

    const ToggleWithdrawals = () => (
      <ToggleRow
        label={notificationsApprovedWithdrawalsEmailLabel}
        isEnabled={withdrawalNotifications}
        onChange={setWithdrawalNotifications}
      />
    );

    const RealityCheck = () => (
      <RealityCheckField
        enabled={canChangeInterval}
        link="/player/settings/reality-check"
        title={notificationsInGameSessionUpdatesLabel}
        interval={intervalInMinutes}
        frequencyLabel={inGameSessionUpdatesFrequencyLabel}
        frequencyOffLabel={inGameSessionUpdatesOffLabel}
      />
    );

    const CheckEmail = () => (
      <SubscriptionRow
        label={subscriptionsEmailLabel}
        isEnabled={subscribedToNewsletters}
        onChange={setNewsletterSubscription}
      />
    );

    const CheckSMS = () => (
      <SubscriptionRow
        label={subscriptionsSMSLabel}
        isEnabled={subscribedToSMSNewsletters}
        onChange={setSMSNewsletterSubscription}
      />
    );

    const CheckPhone = () => (
      <SubscriptionRow
        label={subscriptionsPhoneLabel}
        isEnabled={contactByPhone}
        onChange={setContactByPhone}
      />
    );

    const CheckPost = () => (
      <SubscriptionRow
        label={subscriptionsPostLabel}
        isEnabled={contactByPost}
        onChange={setContactByPost}
      />
    );
    return (
      <>
        <ToggleWithdrawals />
        <RealityCheck />

        <SettingsRow
          text={
            <SettingsHeadline
              title={subscriptionsTitle}
              description={subscriptionsDescription}
            />
          }
          className="t-border-bottom--none u-margin-top--md"
        />

        <CheckEmail />
        <CheckSMS />
        <CheckPhone />
        <CheckPost />
      </>
    );
  }
}
