import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Text from "@casumo/cmp-text";
import http from "Lib/http";
import { isMobile } from "Components/ResponsiveLayout";
import { JackpotRules } from "Components/JackpotDetailPage/JackpotRules";
import { urls } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { useHandshake } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
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
  const handshake = useHandshake();

  const handleAcceptModal = () => {
    const isPotAvailable = handshake.jackpots.find(
      pot => pot.jackpotSlug === "casumo-jackpots"
    );

    if (isPotAvailable) {
      http
        .post(urls.optIn, { jackpotId: isPotAvailable.jackpotId })
        .then(({ optedIn }) => {
          acceptModal();
        });
    }
  };

  return (
    <CudlModal
      closeIcon={{
        action: cancelModal,
      }}
      primaryButton={{
        text: t.button_accept || "",
        action: handleAcceptModal,
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
          w: isMobile() ? 700 : 410,
        }}
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {t.onboarding_title}
      </Text>
      <Text>{t.onboarding_text || ""}</Text>
      <JackpotRules
        text={t.rules_text || ""}
        tncLabel=""
        jackpotSlug="casumo-jackpots"
      />
      <Text>{}</Text>
    </CudlModal>
  );
}
