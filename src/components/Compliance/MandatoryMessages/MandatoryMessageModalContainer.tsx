import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import { useTranslations, useTranslationsVoca } from "Utils/hooks";
import { useMarkAsReadMutation } from "Models/mandatoryMessages";

type Props = {
  t: {
    headline: string;
    call_to_action_button_text: string;
    icon: string;
  },
  config: {
    input: {
      slug: string;
      messageId: string;
    }
  }
};

export function MandatoryMessageModalContainer({
  t,
  config
}: Props) {
  const content = useTranslations(config?.input?.slug, true);
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();
  const voca = useTranslationsVoca();

  return (
   <CudlModal
    topTitle={t?.headline}
    primaryButton={{
      isLoading,
      action: () => {
        markAsRead(config?.input.messageId);
      },
      text: t?.call_to_action_button_text || voca?.BUTTON_CLOSE
    }}
   >
     <Text>
       {content}
     </Text>
   </CudlModal>
  );
}