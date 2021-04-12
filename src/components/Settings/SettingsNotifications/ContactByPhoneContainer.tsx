import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SetContactByPhone } from "./Mutations.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";

export function ContactByPhoneContainer() {
  const { t } = useTranslationsGql({
    label: "root:player-settings-component:fields.subscriptions_phone_label",
  });
  const [setContactByPhone] = useMutation<
    A.SetContactByPhoneMutation,
    A.SetContactByPhoneMutationVariables
  >(SetContactByPhone, {
    onError: onMutationError,
    refetchQueries: [{ query: PLAYER_CONTACT_SETTINGS_QUERY }],
  });
  const { data, error, loading, refetch } = useQuery<
    A.Player_Contact_Settings_Query,
    A.Player_Contact_Settings_QueryVariables
  >(PLAYER_CONTACT_SETTINGS_QUERY);

  if ((loading && !data) || !t?.label) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.label}
      isEnabled={data.player.details.contactSettings.contactByPhone}
      onChange={value =>
        setContactByPhone({
          variables: { input: { on: value } },
        })
      }
    />
  );
}
