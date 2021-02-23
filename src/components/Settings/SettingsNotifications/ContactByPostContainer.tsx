// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { SetContactByPost } from "./Mutations.graphql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ContactByPost.graphql' or it... Remove this comment to see the full error message
import { SettingsNotificationsContactByPostQuery } from "./ContactByPost.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function ContactByPostContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsPostLabel:
      "root:player-settings-component:fields.subscriptions_post_label",
  });
  const [setContactByPost] = useMutation<
    A.SetContactByPost,
    A.SetContactByPostVariables
  >(SetContactByPost, {
    onError: onMutationError,
    refetchQueries: [{ query: SettingsNotificationsContactByPostQuery }],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsContactByPostQuery,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(SettingsNotificationsContactByPostQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<SettingsNotificati... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'subscriptionsPostLabel' does not exist o... Remove this comment to see the full error message
      label={t.subscriptionsPostLabel}
      isEnabled={data.player.details.contactSettings.contactByPost}
      onChange={value =>
        setContactByPost({
          variables: { input: { on: value } },
          optimisticResponse: { setContactByPost: value },
        })
      }
    />
  );
}
