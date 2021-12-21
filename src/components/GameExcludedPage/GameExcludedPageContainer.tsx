import React from "react";
import { useTranslations } from "Utils/hooks";
import { TGameExcludedPage, GameExcludedPage } from "./GameExcludedPage";

export const GameExcludedPageContainer = () => {
  const t = useTranslations<TGameExcludedPage>(
    "game-excluded-page.game-excluded-details-page"
  );
  return <GameExcludedPage t={t} />;
};
