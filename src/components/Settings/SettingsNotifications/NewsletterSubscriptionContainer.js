// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SetNewsletterSubscription } from "./Mutations.graphql";
import { SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT } from "./PlayerContactSettingsQuery";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import {
  getApolloCacheUpdater,
  onMutationError,
} from "./SettingsNotifications.utils";

type Props = {
  playerId: string,
  subscribedToNewsletters: boolean,
  subscriptionsEmailLabel: string,
};

export function NewsletterSubscriptionContainer({
  playerId,
  subscribedToNewsletters,
  subscriptionsEmailLabel,
}: Props) {
  const [setNewsletterSubscription] = useMutation<
    A.SetNewsletterSubscription,
    A.SetNewsletterSubscriptionVariables
  >(SetNewsletterSubscription, { onError: onMutationError });

  return (
    <SubscriptionRow
      label={subscriptionsEmailLabel}
      isEnabled={subscribedToNewsletters}
      onChange={value =>
        setNewsletterSubscription({
          variables: { input: { on: value } },
          optimisticResponse: { setNewsletterSubscription: value },
          update: getApolloCacheUpdater({
            playerId,
            fragment: SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT,
            getContactSettingsField: result => ({
              subscribedToNewsletters: result.data.setNewsletterSubscription,
            }),
          }),
        })
      }
    />
  );
}
