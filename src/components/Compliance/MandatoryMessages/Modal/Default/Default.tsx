import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import { interpolate } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import { Props } from "./Default.types";

export function Default({
  topTitle,
  primaryButton,
  content,
  replacements
}: Props) {
  return (
    <CudlModal
      topTitle={interpolate(topTitle, replacements)}
      primaryButton={{
        ...primaryButton,
        text: interpolate(primaryButton.text, replacements)
      }}
    >
      <DangerousHtml html={interpolate(content, replacements)} />
    </CudlModal>
  );
}