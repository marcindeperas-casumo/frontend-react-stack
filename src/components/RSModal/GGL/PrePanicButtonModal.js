// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  acceptModal: () => void,
  config: {
    content?: any,
  },
};

export function PrePanicButtonModal({ acceptModal, config }: Props) {
  return (
    <CudlModal
      featuredImage={
        <img
          src={config.content?.pregame_image}
          className="u-width--full"
          alt=""
        />
      }
      primaryButton={{
        text: config.content?.pregame_cta_label || "",
        action: () => {
          window.localStorage.setItem("preGamePanicButtonOverlayShown", true);
          acceptModal();
        },
      }}
    >
      <Text tag="h2" size="xlg" className="u-font-weight-bold">
        {config.content?.pregame_title}
      </Text>
      <DangerousHtml html={config.content?.pregame_content || ""} />
    </CudlModal>
  );
}
