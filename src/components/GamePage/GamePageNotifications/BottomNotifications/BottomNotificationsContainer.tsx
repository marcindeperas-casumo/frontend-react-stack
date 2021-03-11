import React from "react";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { useTranslations } from "Utils/hooks";
import { BottomNotifications } from "./BottomNotifications";

type NotificationsPage = {
  meta_properties: Array<{ key: string; value: string }>;
};

export const BottomNotificationsGamePageContainer = () => {
  const { gameProviderModel } = useGameModelContext();
  const gameNotifications = gameProviderModel.onLaunchNotifications || [];

  const t = useTranslations<NotificationsPage>(
    "iframe-solution.game-page-notifications"
  );

  if (gameNotifications.length && t) {
    const translatedNotifications = gameNotifications.map(
      key => t.meta_properties.find(item => item.key === key).value
    );

    return <BottomNotifications notifications={translatedNotifications} />;
  }

  return null;
};
