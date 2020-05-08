// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SetWithdrawalNotifications } from "./Mutations.graphql";
import { WITHDRAWAL_NOTIFICATION_FRAGMENT } from "./PlayerContactSettingsQuery";
import { SettingsNotificationsToggleRow as ToggleRow } from "./SettingsNotificationsToggleRow";
import {
  getApolloCacheUpdater,
  onMutationError,
} from "./SettingsNotifications.utils";

type Props = {
  playerId: string,
  withdrawalNotifications: boolean,
  notificationsApprovedWithdrawalsEmailLabel: string,
};

export function WithdrawalNotificationsContainer({
  playerId,
  withdrawalNotifications,
  notificationsApprovedWithdrawalsEmailLabel,
}: Props) {
  const [setWithdrawalNotifications] = useMutation<
    A.SetWithdrawalNotifications,
    A.SetWithdrawalNotificationsVariables
  >(SetWithdrawalNotifications, { onError: onMutationError });

  return (
    <ToggleRow
      label={notificationsApprovedWithdrawalsEmailLabel}
      isEnabled={withdrawalNotifications}
      onChange={value =>
        setWithdrawalNotifications({
          variables: { input: { on: value } },
          optimisticResponse: { setWithdrawalNotifications: value },
          update: getApolloCacheUpdater({
            playerId,
            fragment: WITHDRAWAL_NOTIFICATION_FRAGMENT,
            getContactSettingsField: result => ({
              withdrawalNotifications: result.data.setWithdrawalNotifications,
            }),
          }),
        })
      }
    />
  );
}
