import React from "react";
import { useTranslations } from "Utils/hooks";
import { ModalContentComponent } from "../rsmodal.mappings";
import { GameLaunchOnboardingModal } from "./GameLaunchOnboardingModal";

export type ModalTranslations = {
  button_accept: string;
  button_deny: string;
  details_image: string;
  onboarding_title: string;
  onboarding_text: string;
  rules_text: string;
};

export const GameLaunchModal = ({
  t,
  acceptModal,
  dismissModal,
}: ModalContentComponent<{}>) => {
  const translations = useTranslations<ModalTranslations>(
    `jackpots-details-pages.casumo-jackpots`
  );

  return (
    translations && (
      <GameLaunchOnboardingModal
        acceptModal={acceptModal}
        cancelModal={dismissModal}
        t={translations}
      />
    )
  );
};
