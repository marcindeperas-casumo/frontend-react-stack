// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetNewsletterSubscription } from "./Mutations.graphql";
import { SettingsNotificationsSubscribedToNewslettersQuery } from "./NewsletterSubscription.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function NewsletterSubscriptionContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsEmailLabel:
      "root:player-settings-component:fields.subscriptions_email_label",
  });
  const [setNewsletterSubscription] = useMutation<
    A.SetNewsletterSubscription,
    A.SetNewsletterSubscriptionVariables
  >(SetNewsletterSubscription, {
    onError: onMutationError,
    refetchQueries: [
      { query: SettingsNotificationsSubscribedToNewslettersQuery },
    ],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsSubscribedToNewslettersQuery,
    _
  >(SettingsNotificationsSubscribedToNewslettersQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.subscriptionsEmailLabel}
      isEnabled={data.player.details.contactSettings.subscribedToNewsletters}
      onChange={value =>
        setNewsletterSubscription({
          variables: { input: { on: value } },
          optimisticResponse: { setNewsletterSubscription: value },
        })
      }
    />
  );
}
