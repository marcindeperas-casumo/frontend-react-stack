// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { SettingsHeadline } from "Components/Settings/SettingsHeadline/SettingsHeadline";
import { Toggle } from "Components/Toggle/Toggle";
import { Checkbox } from "Components/Checkbox/Checkbox";
import Link from "Components/Settings/Link";
import { ContentReplacer } from "Components/ContentReplacer";

type ToggleFn = (active: boolean) => void;
type Props = {
  player: PLAYER_CONTACT_SETTINGS_QUERY_player,
  setAdventurerPublicity: ToggleFn,
  setWithdrawalNotifications: ToggleFn,
  setContactByPost: ToggleFn,
  setContactByPhone: ToggleFn,
  setNewsletterSubscription: ToggleFn,
  setSMSNewsletterSubscription: ToggleFn,
  labels: NOTIFICATIONS_LABELS_QUERY,
};

export const ToggleRow = ({
  label,
  isEnabled,
  onChange,
  className = "",
}: {
  label: string,
  isEnabled: boolean,
  onChange: ToggleFn,
  className?: string,
}) => (
  <SettingsRow
    className={className}
    text={
      <Text
        tag="p"
        size="sm"
        className="t-color-grey-dark-3 u-font-weight-light"
      >
        {label}
      </Text>
    }
    action={<Toggle checked={isEnabled} onChange={onChange} />}
  />
);

const SubscriptionRow = ({
  label,
  isEnabled,
  onChange,
}: {
  label: string,
  isEnabled: boolean,
  onChange: ToggleFn,
}) => (
  <SettingsRow
    padding="md"
    text={
      <Text
        tag="p"
        size="sm"
        className="t-color-grey-dark-3 u-font-weight-light"
      >
        {label}
      </Text>
    }
    action={<Checkbox checked={isEnabled} onChange={onChange} />}
  />
);

class Notifications extends PureComponent<Props> {
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
      <Link
        target="/player/settings/reality-check"
        enabled={canChangeInterval}
        label={
          <SettingsRow
            text={
              <Text
                tag="p"
                size="sm"
                className="t-color-grey-dark-3 u-font-weight-light"
              >
                {notificationsInGameSessionUpdatesLabel}
              </Text>
            }
            action={
              <>
                {intervalInMinutes ? (
                  <Text
                    tag="span"
                    className="t-color-green u-font-weight-light"
                  >
                    <ContentReplacer
                      value={inGameSessionUpdatesFrequencyLabel}
                      replacements={{ amount: intervalInMinutes }}
                    />
                  </Text>
                ) : (
                  <Text
                    tag="span"
                    className="t-color-grey-light-1 u-font-weight-light"
                  >
                    {inGameSessionUpdatesOffLabel}
                  </Text>
                )}
                {canChangeInterval && (
                  <DirectionRightIcon className="t-color-grey-light-1" />
                )}
              </>
            }
          />
        }
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

export default Notifications;
