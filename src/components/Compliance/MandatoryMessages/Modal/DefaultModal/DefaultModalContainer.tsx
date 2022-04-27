import * as React from "react";
import { DefaultModal } from "./DefaultModal";
import { ContainerProps } from "./DefaultModal.types";
import { useDefaultModalState } from "./useDefaultModalState";

export function DefaultModalContainer({ t, config }: ContainerProps) {
  const { markAsRead, isLoading, buttonLabel, content } = useDefaultModalState(
    config?.input ?? {}
  );
  const { parameters } = config?.input?.message ?? {};

  return (
    <DefaultModal
      topTitle={t?.headline}
      cudlIcon={t?.cudl_icon}
      content={content}
      replacements={parameters}
      primaryButton={{
        isLoading,
        action: markAsRead,
        text: buttonLabel,
      }}
    />
  );
}
