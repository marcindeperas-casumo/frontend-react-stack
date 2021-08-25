import React from "react";
import http from "Lib/http";
import { useTranslations } from "Utils/hooks";
import { urls } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { useHandshake } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { ModalContentComponent } from "../rsmodal.mappings";
import { InGameOnboardingModal } from "./InGameOnboardingModal";

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

  const handshake = useHandshake();

  const handleAcceptModal = event => {
    event.stopPropagation();
    const isPotAvailable = handshake.jackpots.find(
      pot => pot.jackpotSlug === config.slug
    );

    if (isPotAvailable) {
      http
        .post(urls.optIn, { jackpotId: isPotAvailable.jackpotId })
        .then(() => {
          acceptModal();
          localStorage.setItem("JackpotOfferPresented", "true");
        });
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
