import * as React from "react";
import { GenericNotification } from "./GenericNotification";
import { useNotificationsSubscription } from "./useNotificationsSubscription";

export const GenericInGameNotifications = () => {
  const notification = useNotificationsSubscription();

  if (!notification) {
    return null;
  }

  return (
    <GenericNotification translationSlug={`notifications.${notification}`} />
  );
};
