import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import * as React from "react";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  acceptModal: () => void;
  config: {
    content?: any;
  };
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
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
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
