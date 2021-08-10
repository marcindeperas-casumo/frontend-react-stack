import React from "react";
import { useTranslations } from "Utils/hooks";
import { GameLaunchOnboardingModal } from "./GameLaunchOnboardingModal";

type TProps = {
  config: string;
  acceptJackpot: () => void;
  denyJackpot: () => void;
};

export type ModalTranslations = {
  button_accept: string;
  button_deny: string;
  details_image: string;
  onboarding_title: string;
  onboarding_text: string;
  rules_text: string;
};

export const GameLaunchModal = ({
  config,
  acceptJackpot,
  denyJackpot,
}: TProps) => {
  const t = useTranslations<ModalTranslations>(
    `jackpots-details-pages.casumo-jackpots`
  );

  return (
    t && (
      <GameLaunchOnboardingModal
        acceptModal={acceptJackpot}
        cancelModal={denyJackpot}
        t={t}
      />
    )
  );
};
