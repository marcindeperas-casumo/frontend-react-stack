// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";

type Props = {
  acceptModal: () => void,
  config: {
    content?: any,
    timeMissed: number,
    tournamentLength: number,
  },
};

export function FiveMinuteBreakReelRaceModal({ acceptModal, config }: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: acceptModal,
      }}
      primaryButton={{
        text: config.content?.break_reel_race_button_label || "",
        action: acceptModal,
      }}
    >
      <img
        src={config.content?.break_reel_race_image}
        className="o-flex__item-align--start"
        alt="ggl-break-finished"
      />
      <Text tag="h2" size="2xlg" className="u-font-weight-bold u-margin-bottom">
        {config.content?.break_reel_race_title}
      </Text>
      <DangerousHtml
        html={interpolate(config.content?.break_reel_race_message || "", {
          timeMissed: config.timeMissed,
          tournamentLength: config.tournamentLength,
        })}
      />
    </CudlModal>
  );
}
