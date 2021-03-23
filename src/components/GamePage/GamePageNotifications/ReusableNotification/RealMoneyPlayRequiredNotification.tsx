import React from "react";
import { REUSABLE_NOTIFICATION_SLUGS } from "../GamePageNotificationsConstants";
import { useGameModelContext } from "../../Contexts";
import { ReusableNotificationContainer as ReusableNotification } from "./ReusableNotificationContainer";

export const RealMoneyPlayRequiredNotification = () => {
  const { game } = useGameModelContext();
  const realMoneyPlayRequired = game?.realMoneyPlayRequired;
  if (!realMoneyPlayRequired) {
    return null;
  }
  return (
    <ReusableNotification
      translationSlug={REUSABLE_NOTIFICATION_SLUGS.REAL_MONEY_ONLY_NOTIFICATION}
    />
  );
};
