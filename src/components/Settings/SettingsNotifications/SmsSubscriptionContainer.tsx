import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetSMSNewsletterSubscription } from "./Mutations.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";

export function SmsSubscriptionContainer() {
  const { t } = useTranslationsGql({
    label: "root:player-settings-component:fields.subscriptions_sms_label",
  });
  const [setSMSNewsletterSubscription] = useMutation<
    A.SetSmsNewsletterSubscriptionMutation,
    A.SetSmsNewsletterSubscriptionMutationVariables
  >(SetSMSNewsletterSubscription, {
    onError: onMutationError,
    refetchQueries: [{ query: PLAYER_CONTACT_SETTINGS_QUERY }],
  });
  const { data, error, loading, refetch } = useQuery<
    A.Player_Contact_Settings_Query,
    A.Player_Contact_Settings_QueryVariables
  >(PLAYER_CONTACT_SETTINGS_QUERY);

  if (loading && !data && !t?.label) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.label}
      isEnabled={data.player.details.contactSettings.subscribedToSMSNewsletters}
      onChange={value =>
        setSMSNewsletterSubscription({
          variables: { input: { on: value } },
        })
      }
    />
  );
}
