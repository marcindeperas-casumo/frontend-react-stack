import * as React from "react";
import { useDispatch } from "react-redux";
import {
  playOkaySuspendAccountCmsSlug,
  TPlayOkaySuspendAccountTranslations,
  useGetPlayerConfigQuery,
  useSuspendAccountMutation,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { hideModal } from "Models/modal";
import { Modal } from "./Modal";
import { steps, stepContents } from "./Modal.constants";

export function ModalContainer() {
  const dispatch = useDispatch();
  const t = useTranslations<TPlayOkaySuspendAccountTranslations>(
    playOkaySuspendAccountCmsSlug
  );
  const { data: playOkayConfig } = useGetPlayerConfigQuery();
  const [suspendAccount, { isLoading: isSuspendingAccount }] =
    useSuspendAccountMutation();
  const [step, setStep] = React.useState(0);
  const isLastStep = step === steps.length - 1;
  const [selectedPeriod, selectPeriod] = React.useState(null);
  const takeABreak = () =>
    suspendAccount({
      days: selectedPeriod,
      takeABreak: true,
      reason: "",
    });
  const Content = stepContents[step];
  const takeABreakConfig = playOkayConfig?.exclusions.find(
    exclusionConfig => exclusionConfig.type === "takeABreak"
  );

  if (!Content) {
    return null;
  }

  return (
    <Modal
      t={t}
      progressSteps={steps.map((stepConfig, index) => ({
        ...stepConfig,
        isActive: step >= index,
      }))}
      primaryButton={{
        action: () => (isLastStep ? takeABreak() : setStep(prev => prev + 1)),
        isLoading: isSuspendingAccount,
        isDisabled: isLastStep && !selectedPeriod,
      }}
      secondaryButton={{
        action: () => dispatch(hideModal()),
      }}
      closeIcon={{
        action: () => dispatch(hideModal()),
      }}
    >
      <Content
        t={t}
        validPeriods={takeABreakConfig?.validPeriods}
        selectedPeriod={selectedPeriod}
        selectPeriod={selectPeriod}
      />
    </Modal>
  );
}
