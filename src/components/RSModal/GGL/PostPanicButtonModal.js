// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { ROUTE_IDS } from "Src/constants";
import { useCrossCodebaseNavigation } from "Utils/hooks";

type Props = {
  acceptModal: () => void,
  config: {
    content?: any,
  },
};

export function PostPanicButtonModal({ acceptModal, config }: Props) {
  const { navigateToKO } = useCrossCodebaseNavigation();

  return (
    <CudlModal
      primaryButton={{
        text: config.content?.continue_label || "",
        action: () => {
          navigateToKO(ROUTE_IDS.TOP_LISTS);
          acceptModal();
        },
      }}
    >
      <Text tag="h2" size="xlg" className="u-font-weight-bold">
        {config.content?.postgame_title}
      </Text>
      <DangerousHtml html={config.content?.postgame_content || ""} />
    </CudlModal>
  );
}
