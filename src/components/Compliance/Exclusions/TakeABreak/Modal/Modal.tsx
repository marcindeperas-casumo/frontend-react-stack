import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import { TPlayOkaySuspendAccountTranslations } from "Models/playOkay";
import {
  ProgressWithSteps,
  TProgressWithStepsProps,
} from "Components/Progress";

type TProps = {
  t: TPlayOkaySuspendAccountTranslations | null;
  progressSteps: TProgressWithStepsProps["steps"];
  children: React.ReactNode;
  primaryButton: {
    action: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
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
  progressSteps,
  primaryButton,
  secondaryButton,
  closeIcon,
  children,
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
        text: t?.button_cancel,
      }}
    >
      <div className="flex flex-col gap-md">
        <ProgressWithSteps steps={progressSteps} />
        <Text size="md" className="text-purple-60">
          {t?.main_title}
        </Text>
        {children}
      </div>
    </CudlModal>
  );
}
