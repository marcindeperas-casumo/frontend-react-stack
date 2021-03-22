import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "Utils/hooks";
import { playerWalletBonusSelector } from "Models/player";
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
  const bonusAmount = useSelector(playerWalletBonusSelector);
  const t = useTranslations<TReusableNotificationTranslations>(translationSlug);

  if (!t || !bonusAmount) {
    return null;
  }

  return <ReusableNotification t={t} />;
}
