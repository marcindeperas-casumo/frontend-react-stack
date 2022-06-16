import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import { TPlayOkaySuspendAccountTranslations } from "Models/playOkay";

type TProps = {
  t: TPlayOkaySuspendAccountTranslations | null;
  primaryButton: {
    action: () => void;
    isDisabled?: boolean;
  };
  secondaryButton: {
    action: () => void;
    isDisabled?: boolean;
  };
  closeIcon: {
    action: () => void;
  };
};

export function Modal({
  t,
  primaryButton,
  secondaryButton,
  closeIcon,
}: TProps) {
  return (
    <CudlModal
      topTitle={t?.main_title}
      closeIcon={closeIcon}
      primaryButton={{
        ...primaryButton,
        text: t?.marketing_closure_button,
      }}
      secondaryButton={{
        ...secondaryButton,
        text: t?.non_marketing_closure_button,
      }}
    >
      <div className="flex flex-col gap">
        <Text size="md" className="text-purple-60">
          {t?.main_form_title}
        </Text>
        <Text>{t?.main_description}</Text>
      </div>
    </CudlModal>
  );
}
