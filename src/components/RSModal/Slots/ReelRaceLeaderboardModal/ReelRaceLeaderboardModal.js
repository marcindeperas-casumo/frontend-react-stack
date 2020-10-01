// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import FeaturedImage from "./featuredImage.svg";

type Props = {
  acceptModal: () => void,
};

export function ReelRaceLeaderboardModal({ acceptModal }: Props) {
  return (
    <CudlModal
      closeIcon={{ action: acceptModal }}
      topTitle="Congratulations, you placed 1st!"
      primaryButton={{ text: "Name", action: acceptModal }}
      featuredImage={<FeaturedImage />}
    >
      Modal
    </CudlModal>
  );
}
