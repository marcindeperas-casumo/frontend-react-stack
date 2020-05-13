// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetWithdrawalNotifications } from "./Mutations.graphql";
import { SettingsNotificationsWithdrawalNotificationsQuery } from "./WithdrawalNotifications.graphql";
import { SettingsNotificationsToggleRow as ToggleRow } from "./SettingsNotificationsToggleRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function WithdrawalNotificationsContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    notificationsApprovedWithdrawalsEmailLabel:
      "root:player-settings-component:fields.notifications_approved_withdrawals_email_label",
  });
  const [setWithdrawalNotifications] = useMutation<
    A.SetWithdrawalNotifications,
    A.SetWithdrawalNotificationsVariables
  >(SetWithdrawalNotifications, {
    onError: onMutationError,
    refetchQueries: [
      { query: SettingsNotificationsWithdrawalNotificationsQuery },
    ],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsWithdrawalNotificationsQuery,
    _
  >(SettingsNotificationsWithdrawalNotificationsQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <ToggleRow
      label={t.notificationsApprovedWithdrawalsEmailLabel}
      isEnabled={data.player.details.contactSettings.withdrawalNotifications}
      onChange={value =>
        setWithdrawalNotifications({
          variables: { input: { on: value } },
          optimisticResponse: { setWithdrawalNotifications: value },
        })
      }
    />
  );
}
