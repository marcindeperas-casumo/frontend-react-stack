import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Text from "@casumo/cmp-text";
import { ModalConfig } from "Models/modal";
import { isMobile } from "Components/ResponsiveLayout";
import { JackpotRules } from "Components/JackpotDetailPage/JackpotRules";
import { ModalTranslations } from "./InGameOnboardingModalContainer";

type Props = {
  acceptModal: (event: any) => void;
  cancelModal: (event: any) => void;
  t: ModalTranslations;
  config: ModalConfig;
};

export function InGameOnboardingModal({
  acceptModal,
  cancelModal,
  t,
  config,
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
        dpr={Math.ceil(window.devicePixelRatio)}
        imgixOpts={{
          fit: "crop",
          w: isMobile() ? 700 : 410,
        }}
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {t.onboarding_title}
      </Text>
      <Text>{t.onboarding_text || ""}</Text>
      <JackpotRules
        text={t.rules_text || ""}
        tncLabel={t.tncLabel || ""}
        jackpotSlug={config.slug}
      />
    </CudlModal>
  );
}
