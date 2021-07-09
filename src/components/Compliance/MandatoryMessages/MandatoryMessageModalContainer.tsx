import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import { useTranslations } from "Utils/hooks";

type Props = {
  t: {
    headline: string;
    call_to_action_button_text: string;
  },
  config: {
    input: {
      slug: string;
    }
  },
  acceptModal: () => void
};

export function MandatoryMessageModalContainer({
  t,
  config,
  acceptModal
}: Props) {
  const content = useTranslations(config.input.slug, true);

  return (
   <CudlModal
    topTitle={t?.headline}
    primaryButton={{
      action: acceptModal,
      label: t?.call_to_action_button_text
    }}
   >
     <Text>
       {content}
     </Text>
   </CudlModal>
  );
}