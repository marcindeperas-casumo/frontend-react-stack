import { useTranslations, useTranslationsVoca } from "Utils/hooks";
import { interpolate } from "Utils";
import { useMarkAsReadMutation } from "Models/mandatoryMessages";
import {
  TUseDefaultModalStateArgs,
  TUseDefaultModalState,
} from "./useDefaultModalState.types";
import { TTranslations } from "./DefaultModal.types";

export function useDefaultModalState({
  message,
  slug,
}: TUseDefaultModalStateArgs): TUseDefaultModalState {
  const content = useTranslations(slug, true);
  const t = useTranslations<TTranslations>(slug);
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();
  const voca = useTranslationsVoca();

  return {
    markAsRead: () => markAsRead(message?.id),
    isLoading,
    isDisabled: false,
    content: interpolate(content, message?.parameters),
    buttonLabel: interpolate(
      t?.call_to_action_button_text || voca?.BUTTON_CLOSE,
      message?.parameters
    ),
  };
}
