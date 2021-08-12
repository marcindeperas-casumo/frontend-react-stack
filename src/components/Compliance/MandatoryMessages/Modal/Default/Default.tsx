import * as React from "react";
import Flex from "@casumo/cmp-flex";
import CudlModal from "@casumo/cmp-modal";
import * as cudlIcons from "@casumo/cmp-icons";
import { interpolate } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import { Props } from "./Default.types";

export function Default({
  topTitle,
  cudlIcon,
  primaryButton,
  content,
  replacements,
}: Props) {
  const Icon = cudlIcons[cudlIcon] ?? cudlIcons.WarningIcon;

  return (
    <CudlModal
      topTitle={
        <Flex align="center">
          {Icon && (
            <Flex.Item>
              <Icon size="md" />
            </Flex.Item>
          )}
          <Flex.Item>
            <DangerousHtml html={interpolate(topTitle, replacements)} />
          </Flex.Item>
        </Flex>
      }
      primaryButton={{
        ...primaryButton,
        text: interpolate(primaryButton.text, replacements),
      }}
    >
      <DangerousHtml html={interpolate(content, replacements)} />
    </CudlModal>
  );
}
