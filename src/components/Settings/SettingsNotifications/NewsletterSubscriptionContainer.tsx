// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { SetNewsletterSubscription } from "./Mutations.graphql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './NewsletterSubscription.graph... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(SettingsNotificationsSubscribedToNewslettersQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<SettingsNotificati... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'subscriptionsEmailLabel' does not exist ... Remove this comment to see the full error message
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
