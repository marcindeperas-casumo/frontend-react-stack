import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import * as React from "react";

type Props = {
  acceptModal: () => void;
  cancelModal: () => void;
  config: {
    content?: any;
  };
};

export function GameLaunchOnboardingModal({
  acceptModal,
  cancelModal,
  config,
}: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: cancelModal,
      }}
      primaryButton={{
        text: config.content?.button_accept || "",
        action: acceptModal,
      }}
      secondaryButton={{
        text: config.content?.button_deny || "",
        action: cancelModal,
      }}
    >
      <img
        src={config.content?.details_image}
        className="o-flex__item-align--start"
        alt="onboarding-game-launch-hero-image"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {config.content?.onboarding_title}
      </Text>
      <Text>{config.content?.onboarding_text || ""}</Text>
      <Text>{config.content?.rules_text || ""}</Text>
    </CudlModal>
  );
}
