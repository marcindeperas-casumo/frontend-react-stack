import * as React from "react";
import { ContainerProps } from "../../DefaultModal/DefaultModal.types";
import { DefaultModal } from "../../DefaultModal/DefaultModal";
import { useOutOfHoursModalState } from "./useOutOfHoursModalState";

export function OutOfHoursModalContainer({ t, config }: ContainerProps) {
  const {
    content,
    isDisabled,
    isLoading,
    markAsRead,
    buttonLabel,
  } = useOutOfHoursModalState(config?.input ?? {});

  return (
    <DefaultModal
      topTitle={t?.headline}
      cudlIcon={t?.cudl_icon}
      content={content}
      replacements={config?.input?.message?.parameters ?? {}}
      primaryButton={{
        text: buttonLabel,
        action: markAsRead,
        isLoading,
        isDisabled,
      }}
    />
  );
}
