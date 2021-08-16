import { useTranslations, useTranslationsVoca } from "Utils/hooks";
import { interpolate } from "Utils";
import { useMarkAsReadMutation } from "Models/mandatoryMessages";
import {
  TUseDefaultModalStateArgs,
  TUseDefaultModalState,
} from "./useDefaultModalState.types";

export function useDefaultModalState({
  message,
  slug,
}: TUseDefaultModalStateArgs): TUseDefaultModalState {
  const content = useTranslations(slug, true);
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();
  const voca = useTranslationsVoca();

  return {
    markAsRead: () => markAsRead(message?.id),
    isLoading,
    isDisabled: false,
    content: interpolate(content, message?.parameters),
    buttonLabel: voca?.BUTTON_CLOSE,
  };
}
