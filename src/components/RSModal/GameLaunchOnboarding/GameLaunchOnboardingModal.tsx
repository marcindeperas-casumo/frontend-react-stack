import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import { ModalTranslations } from "./GameLaunchOnboardingModalContainer";

type Props = {
  acceptModal: () => void;
  cancelModal: () => void;
  t: ModalTranslations;
};

export function GameLaunchOnboardingModal({
  acceptModal,
  cancelModal,
  t,
}: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: cancelModal,
      }}
      primaryButton={{
        text: t.button_accept || "",
        action: acceptModal,
      }}
      secondaryButton={{
        text: t.button_deny || "",
        action: cancelModal,
      }}
    >
      <img
        src={t.details_image}
        className="o-flex__item-align--start"
        alt="onboarding-game-launch-hero-image"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {t.onboarding_title}
      </Text>
      <Text>{t.onboarding_text || ""}</Text>
      <Text>{t.rules_text || ""}</Text>
    </CudlModal>
  );
}
