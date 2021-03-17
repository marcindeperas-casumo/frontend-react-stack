import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetWithdrawalNotifications } from "./Mutations.graphql";
import { SettingsNotificationsToggleRow as ToggleRow } from "./SettingsNotificationsToggleRow";
import { onMutationError } from "./SettingsNotifications.utils";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";

export function WithdrawalNotificationsContainer() {
  const { t } = useTranslationsGql({
    label:
      "root:player-settings-component:fields.notifications_approved_withdrawals_email_label",
  });
  const [setWithdrawalNotifications] = useMutation<
    A.SetWithdrawalNotificationsMutation,
    A.SetWithdrawalNotificationsMutationVariables
  >(SetWithdrawalNotifications, {
    onError: onMutationError,
    refetchQueries: [
      { query: PLAYER_CONTACT_SETTINGS_QUERY },
    ],
  });
  const { data, error, loading, refetch } = useQuery<
  A.Player_Contact_Settings_Query, A.Player_Contact_Settings_QueryVariables
  >(PLAYER_CONTACT_SETTINGS_QUERY);

  if ((loading && !data) || !t?.label) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <ToggleRow
      label={t.label}
      isEnabled={data.player.details.contactSettings.withdrawalNotifications}
      onChange={value =>
        setWithdrawalNotifications({
          variables: { input: { on: value } },
        })
      }
    />
  );
}
