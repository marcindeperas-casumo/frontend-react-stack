import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetSMSNewsletterSubscription } from "./Mutations.graphql";
import { SettingsNotificationsSubscribedToSmsNewslettersQuery } from "./SmsSubscription.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function SmsSubscriptionContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsSMSLabel:
      "root:player-settings-component:fields.subscriptions_sms_label",
  });
  const [setSMSNewsletterSubscription] = useMutation<
    A.SetSmsNewsletterSubscriptionMutation,
    A.SetSmsNewsletterSubscriptionMutationVariables
  >(SetSMSNewsletterSubscription, {
    onError: onMutationError,
    refetchQueries: [
      { query: SettingsNotificationsSubscribedToSmsNewslettersQuery },
    ],
  });
  const {
    data,
    error,
    loading,
    refetch,
  } = useQuery<A.SettingsNotificationsSubscribedToSmsNewslettersQuery>(
    SettingsNotificationsSubscribedToSmsNewslettersQuery
  );

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.subscriptionsSMSLabel}
      isEnabled={data.player.details.contactSettings.subscribedToSMSNewsletters}
      onChange={value =>
        setSMSNewsletterSubscription({
          variables: { input: { on: value } },
          optimisticResponse: { setSMSNewsletterSubscription: value },
        })
      }
    />
  );
}
