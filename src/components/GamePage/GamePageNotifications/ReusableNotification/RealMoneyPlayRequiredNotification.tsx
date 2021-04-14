import React from "react";
import Flex from "@casumo/cmp-flex";
import { useSelector } from "react-redux";
import { playerWalletBonusSelector } from "Models/player";
import { REUSABLE_NOTIFICATION_SLUGS } from "../GamePageNotificationsConstants";
import { useGameModelContext } from "../../Contexts";
import { ReusableNotificationContainer as ReusableNotification } from "./ReusableNotificationContainer";

export const RealMoneyPlayRequiredNotification = () => {
  const { game } = useGameModelContext();
  const bonusAmount = useSelector(playerWalletBonusSelector);
  const realMoneyPlayRequired = game?.realMoneyPlayRequired;
  if (!realMoneyPlayRequired || !bonusAmount) {
    return null;
  }
  return (
    <Flex.Item>
      <ReusableNotification
        translationSlug={
          REUSABLE_NOTIFICATION_SLUGS.REAL_MONEY_ONLY_NOTIFICATION
        }
      />
    </Flex.Item>
  );
};
