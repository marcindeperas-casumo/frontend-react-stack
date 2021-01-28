// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";

type Props = {
  acceptModal: () => void,
  config: {
    content?: any,
  },
};

export function FiveMinuteBreakFinishedModal({ acceptModal, config }: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: acceptModal,
      }}
      primaryButton={{
        text: config.content?.break_finished_button_label || "",
        action: acceptModal,
      }}
    >
      <img
        src={config.content?.break_finished_image}
        className="o-flex__item-align--start"
        alt="ggl-break-finished"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {config.content?.break_finished_title}
      </Text>
      <Text className="u-line-height--15">
        {config.content?.break_finished_message || ""}
      </Text>
    </CudlModal>
  );
}
