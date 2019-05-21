// @flow
import React, { PureComponent } from "react";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import Row from "Components/Settings/Row";
import Headline from "Components/Settings/Headline";
import Toggle from "Components/Controls/Toggle";
import Checkbox from "Components/Controls/Checkbox";
import Link from "Components/Settings/Link";

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
  <Row
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
  <Row
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
          <Row
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
                    {intervalInMinutes} min
                  </Text>
                ) : (
                  <Text
                    tag="span"
                    className="t-color-grey-light-1 u-font-weight-light"
                  >
                    Off
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

        <Row
          text={
            <Headline
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
