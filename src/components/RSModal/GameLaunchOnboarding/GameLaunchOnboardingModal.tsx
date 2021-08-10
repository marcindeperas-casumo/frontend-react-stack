import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Text from "@casumo/cmp-text";
import { JackpotRules } from "Components/JackpotDetailPage/JackpotRules";
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
      <ResponsiveImage
        src={t.details_image}
        dpr={window.devicePixelRatio}
        imgixOpts={{
          fit: "crop",
          w: 700,
        }}
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {t.onboarding_title}
      </Text>
      <Text>{t.onboarding_text || ""}</Text>
      <JackpotRules text={t.rules_text || ""} tncLabel="" jackpotSlug="" />
      <Text>{}</Text>
    </CudlModal>
  );
}
