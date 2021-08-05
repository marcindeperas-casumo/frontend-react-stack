import * as React from "react";
import { ContainerProps } from "../../Default/Default.types";
import { Default } from "../../Default/Default";
import { useOutOfHoursState } from "./useOutOfHoursState";

export function OutOfHoursContainer({ t, config }: ContainerProps) {
  const {
    content,
    isDisabled,
    isLoading,
    markAsRead,
    buttonLabel
  } = useOutOfHoursState(config?.input ?? {});

  return (
    <Default
      topTitle={t?.headline}
      content={content}
      replacements={config?.input?.message?.parameters ?? {}}
      primaryButton={{
        text: buttonLabel,
        action: markAsRead,
        isLoading,
        isDisabled
      }}
    />
  );
}