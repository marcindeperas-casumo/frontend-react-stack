import CudlModal from "@casumo/cmp-modal";
import * as React from "react";
import type { ModalContentComponent } from "Components/RSModal/rsmodal.mappings";
import { ContentHtmlContainer } from "./ContentHtmlContainer";

export function ContentHtmlModal({
  acceptModal,
  closeModal,
  config,
}: ModalContentComponent<{}>) {
  return (
    <CudlModal closeIcon={{ action: closeModal }}>
      <ContentHtmlContainer html={config.input?.html || ""} />
    </CudlModal>
  );
}
