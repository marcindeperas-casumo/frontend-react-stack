import { useTranslations, useTranslationsVoca } from "Utils/hooks";
import { interpolate } from "Utils";
import { useMarkAsReadMutation } from "Models/mandatoryMessages";
import {
  TUseDefaultStateArgs,
  TUseDefaultState,
} from "./useDefaultState.types";

export function useDefaultState({
  message,
  slug,
}: TUseDefaultStateArgs): TUseDefaultState {
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
