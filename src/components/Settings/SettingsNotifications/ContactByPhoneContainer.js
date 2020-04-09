// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SetContactByPhone } from "./Mutations.graphql";
import { CONTACT_BY_PHONE_FRAGMENT } from "./PlayerContactSettingsQuery";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import {
  getCacheUpdater,
  onMutationError,
} from "./SettingsNotifications.utils";

type Props = {
  playerId: string,
  contactByPhone: boolean,
  subscriptionsPhoneLabel: string,
};

export function ContactByPhoneContainer({
  playerId,
  contactByPhone,
  subscriptionsPhoneLabel,
}: Props) {
  const [setContactByPhone] = useMutation<
    A.SetContactByPhone,
    A.SetContactByPhoneVariables
  >(SetContactByPhone, { onError: onMutationError });

  return (
    <SubscriptionRow
      label={subscriptionsPhoneLabel}
      isEnabled={contactByPhone}
      onChange={value =>
        setContactByPhone({
          variables: { input: { on: value } },
          optimisticResponse: { setContactByPhone: value },
          update: getCacheUpdater({
            playerId,
            fragment: CONTACT_BY_PHONE_FRAGMENT,
            getContactSettingsField: result => ({
              contactByPhone: result.data.setContactByPhone,
            }),
          }),
        })
      }
    />
  );
}
