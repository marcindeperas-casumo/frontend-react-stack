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
        text: config.content?.onboarding_button_label || "",
        action: acceptModal,
      }}
      secondaryButton={{
        text: config.content?.onboarding_deny_button_label || "",
        action: cancelModal,
      }}
    >
      <img
        src={config.content?.heroImage}
        className="o-flex__item-align--start"
        alt="ggl-break-finished"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {config.content?.onboardingTitle}
      </Text>
      <Text className="u-line-height--15">
        {config.content?.onboardingBodyCopy || ""}
      </Text>
      <Text className="u-line-height--15">
        {config.content?.onboardingBodyCopy2 || ""}
      </Text>
    </CudlModal>
  );
}
