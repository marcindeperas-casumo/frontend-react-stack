// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { SetContactByPhone } from "./Mutations.graphql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ContactByPhone.graphql' or i... Remove this comment to see the full error message
import { SettingsNotificationsContactByPhoneQuery } from "./ContactByPhone.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function ContactByPhoneContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsPhoneLabel:
      "root:player-settings-component:fields.subscriptions_phone_label",
  });
  const [setContactByPhone] = useMutation<
    A.SetContactByPhone,
    A.SetContactByPhoneVariables
  >(SetContactByPhone, {
    onError: onMutationError,
    refetchQueries: [{ query: SettingsNotificationsContactByPhoneQuery }],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsContactByPhoneQuery,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(SettingsNotificationsContactByPhoneQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<SettingsNotificati... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'subscriptionsPhoneLabel' does not exist ... Remove this comment to see the full error message
      label={t.subscriptionsPhoneLabel}
      isEnabled={data.player.details.contactSettings.contactByPhone}
      onChange={value =>
        setContactByPhone({
          variables: { input: { on: value } },
          optimisticResponse: { setContactByPhone: value },
        })
      }
    />
  );
}
