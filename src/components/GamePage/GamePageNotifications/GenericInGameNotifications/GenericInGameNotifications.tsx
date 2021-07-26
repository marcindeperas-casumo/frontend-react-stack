import * as React from "react";
import { ReusableNotification } from "../ReusableNotification";
import { useNotificationsSubscription } from "./useNotificationsSubscription";

export const GenericInGameNotifications = () => {
  const notification = useNotificationsSubscription();

  if (!notification) {
    return null;
  }

  return (
    <ReusableNotification translationSlug={`notifications.${notification}`} />
  );
};
