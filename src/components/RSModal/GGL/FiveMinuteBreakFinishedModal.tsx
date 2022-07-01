import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { useSelector } from "react-redux";
import { useAcknowledgeGglPendingConfirmationMutation } from "Models/playOkay/realityCheck/realityCheck.api";
import { jurisdictionSelector, playerIdSelector } from "Models/handshake";

type Props = {
  acceptModal: () => void;
  config: {
    content?: any;
  };
};

export function FiveMinuteBreakFinishedModal({ acceptModal, config }: Props) {
  const [acknowledgeConfirmation, { isLoading }] =
    useAcknowledgeGglPendingConfirmationMutation();
  const playerId = useSelector(playerIdSelector);
  const playerJurisdiction = useSelector(jurisdictionSelector);

  const handleContinuePlaying = () => {
    acknowledgeConfirmation({ playerId, playerJurisdiction });
    // eslint-disable-next-line no-console
    console.log("Called FiveMinuteBreakFinishedModal");
    acceptModal();
  };

  return (
    <CudlModal
      closeIcon={{
        action: handleContinuePlaying,
      }}
      primaryButton={{
        text: config.content?.break_finished_button_label || "",
        action: handleContinuePlaying,
        isLoading: isLoading,
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
