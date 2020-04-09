// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SetContactByPost } from "./Mutations.graphql";
import { CONTACT_BY_POST_FRAGMENT } from "./PlayerContactSettingsQuery";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import {
  getCacheUpdater,
  onMutationError,
} from "./SettingsNotifications.utils";

type Props = {
  playerId: string,
  contactByPost: boolean,
  subscriptionsPostLabel: string,
};

export function ContactByPostContainer({
  playerId,
  contactByPost,
  subscriptionsPostLabel,
}: Props) {
  const [setContactByPost] = useMutation<
    A.SetContactByPost,
    A.SetContactByPostVariables
  >(SetContactByPost, { onError: onMutationError });

  return (
    <SubscriptionRow
      label={subscriptionsPostLabel}
      isEnabled={contactByPost}
      onChange={value =>
        setContactByPost({
          variables: { input: { on: value } },
          optimisticResponse: { setContactByPost: value },
          update: getCacheUpdater({
            playerId,
            fragment: CONTACT_BY_POST_FRAGMENT,
            getContactSettingsField: result => ({
              contactByPost: result.data.setContactByPost,
            }),
          }),
        })
      }
    />
  );
}
