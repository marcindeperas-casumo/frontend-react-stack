// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { SetSMSNewsletterSubscription } from "./Mutations.graphql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SmsSubscription.graphql' or ... Remove this comment to see the full error message
import { SettingsNotificationsSubscribedToSmsNewslettersQuery } from "./SmsSubscription.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function SmsSubscriptionContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsSMSLabel:
      "root:player-settings-component:fields.subscriptions_sms_label",
  });
  const [setSMSNewsletterSubscription] = useMutation<
    A.SetSMSNewsletterSubscription,
    A.SetSMSNewsletterSubscriptionVariables
  >(SetSMSNewsletterSubscription, {
    onError: onMutationError,
    refetchQueries: [
      { query: SettingsNotificationsSubscribedToSmsNewslettersQuery },
    ],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsSubscribedToSmsNewslettersQuery,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(SettingsNotificationsSubscribedToSmsNewslettersQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<SettingsNotificati... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'subscriptionsSMSLabel' does not exist on... Remove this comment to see the full error message
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
