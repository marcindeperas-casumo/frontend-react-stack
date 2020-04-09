// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SetSMSNewsletterSubscription } from "./Mutations.graphql";
import { SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT } from "./PlayerContactSettingsQuery";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import {
  getCacheUpdater,
  onMutationError,
} from "./SettingsNotifications.utils";

type Props = {
  playerId: string,
  subscribedToSMSNewsletters: boolean,
  subscriptionsSMSLabel: string,
};

export function SmsSubscriptionContainer({
  playerId,
  subscriptionsSMSLabel,
  subscribedToSMSNewsletters,
}: Props) {
  const [setSMSNewsletterSubscription] = useMutation<
    A.SetSMSNewsletterSubscription,
    A.SetSMSNewsletterSubscriptionVariables
  >(SetSMSNewsletterSubscription, { onError: onMutationError });

  return (
    <SubscriptionRow
      label={subscriptionsSMSLabel}
      isEnabled={subscribedToSMSNewsletters}
      onChange={value =>
        setSMSNewsletterSubscription({
          variables: { input: { on: value } },
          optimisticResponse: { setSMSNewsletterSubscription: value },
          update: getCacheUpdater({
            playerId,
            fragment: SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT,
            getContactSettingsField: result => ({
              subscribedToSMSNewsletters:
                result.data.setSMSNewsletterSubscription,
            }),
          }),
        })
      }
    />
  );
}
