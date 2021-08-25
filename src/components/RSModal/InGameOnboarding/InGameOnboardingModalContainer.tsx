import React from "react";
import http from "Lib/http";
import { useTranslations } from "Utils/hooks";
import { urls } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { ModalContentComponent } from "../rsmodal.mappings";
import { InGameOnboardingModal } from "./InGameOnboardingModal";
import { useManualJackpotOptInAndOptOut } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";

export type ModalTranslations = {
  button_accept: string;
  button_deny: string;
  details_image: string;
  onboarding_title: string;
  onboarding_text: string;
  rules_text: string;
  tncLabel: string;
};

export const InGameOnboardingModalContainer = ({
  config,
  acceptModal,
  dismissModal,
}: ModalContentComponent<{}>) => {
  const translations = useTranslations<ModalTranslations>(
    `jackpots-details-pages.${config.slug}`
  );

  const jackpots = useManualJackpotOptInAndOptOut(config.slug);

  const handleAcceptModal = event => {
    event.stopPropagation();

    if (jackpots) {
      jackpots.optIn();
      acceptModal();
      localStorage.setItem("JackpotOfferPresented", "true");
    }
  };

  const handleCancelModal = event => {
    event.stopPropagation();
    localStorage.setItem("JackpotOfferPresented", "true");
    dismissModal();
  };

  return (
    translations && (
      <InGameOnboardingModal
        acceptModal={handleAcceptModal}
        cancelModal={handleCancelModal}
        t={translations}
        config={config}
      />
    )
  );
};
