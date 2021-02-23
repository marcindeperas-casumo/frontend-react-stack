// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { SetWithdrawalNotifications } from "./Mutations.graphql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './WithdrawalNotifications.grap... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(SettingsNotificationsWithdrawalNotificationsQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<SettingsNotificati... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <ToggleRow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'notificationsApprovedWithdrawalsEmailLab... Remove this comment to see the full error message
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
