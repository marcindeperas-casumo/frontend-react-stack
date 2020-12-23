// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import Timer from "Components/Timer";
import { interpolateWithJSX } from "Utils";

type Props = {
  acceptModal: () => void,
  config: {
    content?: any,
    timeLeft: number,
    extraActionOnAccept: () => void,
  },
};

export function FiveMinuteBreakOngoingModal({ acceptModal, config }: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: () => {
          acceptModal();
          config.extraActionOnAccept();
        },
      }}
      primaryButton={{
        text: config.content?.break_button_label || "",
        action: () => {
          acceptModal();
          config.extraActionOnAccept();
        },
      }}
    >
      <img
        src={config.content?.break_image}
        className="o-flex__item-align--start"
        alt="ggl-break-finished"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {interpolateWithJSX(
          {
            timeLeft: (
              <Timer
                endTime={config.timeLeft}
                onEnd={() => (
                  <span className="u-font-variant-numeric--tabular-nums">
                    00:00
                  </span>
                )}
                render={state => (
                  <span className="u-font-variant-numeric--tabular-nums">
                    {state.minutes}:{state.seconds}
                  </span>
                )}
              />
            ),
          },
          config.content?.break_title
        )}
      </Text>
      <Text className="u-line-height--15">
        {config.content?.break_message || ""}
      </Text>
    </CudlModal>
  );
}
