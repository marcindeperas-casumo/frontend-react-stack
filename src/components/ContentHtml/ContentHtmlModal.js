// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import type { ModalContentComponent } from "Components/RSModal/rsmodal.mappings";
import { ContentHtml } from "./ContentHtml";

export function ContentHtmlModal({
  acceptModal,
  closeModal,
  config,
}: ModalContentComponent<{}>) {
  return (
    <CudlModal closeIcon={{ action: closeModal }}>
      <ContentHtml html={config.input?.html || ""} />
    </CudlModal>
  );
}
