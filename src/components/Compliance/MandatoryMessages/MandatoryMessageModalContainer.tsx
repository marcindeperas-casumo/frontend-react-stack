import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import { useTranslations, useTranslationsVoca } from "Utils/hooks";
import { interpolate } from "Utils";
import {
  useMarkAsReadMutation,
  TMandatoryMessage,
} from "Models/mandatoryMessages";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  t: {
    headline: string;
    call_to_action_button_text: string;
    icon: string;
  };
  config: {
    input: {
      slug: string;
      message: TMandatoryMessage;
    };
  };
};

export function MandatoryMessageModalContainer({ t, config }: Props) {
  const { parameters } = config?.input?.message ?? {};
  const content = useTranslations(config?.input?.slug, true);
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();
  const voca = useTranslationsVoca();

  return (
    <CudlModal
      topTitle={interpolate(t?.headline, parameters)}
      primaryButton={{
        isLoading,
        action: () => {
          markAsRead(config?.input.message.id);
        },
        text:
          interpolate(t?.call_to_action_button_text, parameters) ||
          voca?.BUTTON_CLOSE,
      }}
    >
      <DangerousHtml html={interpolate(content, parameters)} />
    </CudlModal>
  );
}
