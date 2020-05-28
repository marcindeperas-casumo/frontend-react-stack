// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SetContactByPhone } from "./Mutations.graphql";
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
    _
  >(SettingsNotificationsContactByPhoneQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
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
