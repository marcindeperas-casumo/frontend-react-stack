import React from "react";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { useTranslations } from "Utils/hooks";
import { BottomNotifications } from "./BottomNotifications";

export const BottomNotificationsGamePageContainer = () => {
  const { gameProviderModel } = useGameModelContext();
  const gameNotifications = gameProviderModel.onLaunchNotifications || [];

  const t = useTranslations("iframe-solution.game-page-notifications");

  const translatedNotifications = gameNotifications.map(key => key); //find in translations

  if (gameNotifications.length && t) {
    return <BottomNotifications notifications={translatedNotifications} />;
  }

  return null;
};
