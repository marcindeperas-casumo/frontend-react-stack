import React from "react";
import { useTranslations } from "Utils/hooks";
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

  return (
    translations && (
      <InGameOnboardingModal
        acceptModal={acceptModal}
        cancelModal={dismissModal}
        t={translations}
        config={config}
      />
    )
  );
};
