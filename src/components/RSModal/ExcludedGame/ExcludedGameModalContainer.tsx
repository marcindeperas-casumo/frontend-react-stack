import React from "react";
import { useTranslatedUrl, useTranslations } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ModalContentComponent } from "../rsmodal.mappings";
import { ExcludedGameModal } from "./ExcludedGameModal";

export type ModalTranslations = {
  button_redirect: string;
  excluded_game_text: string;
  excluded_game_text_title: string;
  redirect_button_text: string;
  play_okay_logo: string;
};

export const ExcludedGameModalContainer = ({
  config,
}: ModalContentComponent<{}>) => {
  const t = useTranslations<ModalTranslations>(
    "game-excluded-page.game-excluded-details-page"
  );
  const playOkayPath = useTranslatedUrl(ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS);

  const clickHandler = () => {
    // had to use window.location as regular router functions were not working here
    // eslint-disable-next-line fp/no-mutation
    window.location.href = `${window.location.origin}/${playOkayPath}`;
  };

  return (
    t && <ExcludedGameModal t={t} config={config} closeModal={clickHandler} />
  );
};
