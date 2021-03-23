import * as React from "react";
import { useTranslations } from "Utils/hooks";
import type { TReusableNotificationTranslations } from "../GamePageNotificationsConstants";
import { ReusableNotification } from "./ReusableNotification";

export type TReusableNotificationProps = {
  translationSlug: string;
};

/* Reuse this game notification by creating cms translation page and passing over the slug as a prop 
   Props supported are translations containing the following keys: notification_image and notification_content 
*/

export function ReusableNotificationContainer({
  translationSlug,
}: TReusableNotificationProps) {
  const t = useTranslations<TReusableNotificationTranslations>(translationSlug);

  if (!t) {
    return null;
  }

  return <ReusableNotification t={t} />;
}
