// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetContactByPost } from "./Mutations.graphql";
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
  const { data, error, loading, refetch } = useQuery<_, _>(
    SettingsNotificationsContactByPostQuery
  );

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.subscriptionsPostLabel}
      isEnabled={data.player.details.contactSettings.contactByPost}
      onChange={value =>
        setContactByPost({
          variables: { input: { on: value } },
          optimisticResponse: { setContactByPost: value },
          // update: getApolloCacheUpdater({
          //   playerId,
          //   fragment: CONTACT_BY_POST_FRAGMENT,
          //   getContactSettingsField: result => ({
          //     contactByPost: result.data.setContactByPost,
          //   }),
          // }),
        })
      }
    />
  );
}
