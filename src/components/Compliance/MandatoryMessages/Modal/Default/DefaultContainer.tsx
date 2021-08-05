import * as React from "react";
import { interpolate } from "Utils";
import { Default } from "./Default";
import { ContainerProps } from "./Default.types";
import { useDefaultState } from "./useDefaultState";

export function DefaultContainer({ t, config }: ContainerProps) {
  const {
    markAsRead,
    isLoading,
    buttonLabel,
    content
  } = useDefaultState(config?.input);
  const { parameters } = config?.input?.message ?? {};

  return (
    <Default
      topTitle={t?.headline}
      content={content}
      replacements={parameters}
      primaryButton={{
        isLoading,
        action: markAsRead,
        text:
          interpolate(t?.call_to_action_button_text, parameters) ||
          buttonLabel
      }}
    />
  );
}
