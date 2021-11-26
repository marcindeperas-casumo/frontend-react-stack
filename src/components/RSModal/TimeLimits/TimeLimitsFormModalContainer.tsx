import * as React from "react";
import { useTranslations } from "Utils/hooks";
import { loginTimeLimitsCmsSlug } from "Models/playOkay";
import { TimeLimitsFormView } from "Components/Compliance/Sweden/TimeLimits";
import { ModalHeader } from "Components/RSModal";

type Props = {
  acceptModal: () => void;
  config: {
    mustAccept?: boolean;
  };
};

export function TimeLimitsFormModalContainer({
  acceptModal,
  config = {},
}: Props) {
  const t = useTranslations<{
    form_top_header_initial: string;
    form_top_header_edit: string;
  }>(loginTimeLimitsCmsSlug);
  const headerProps = !config.mustAccept
    ? {
        title: t?.form_top_header_edit || "",
        showCloseButton: true,
        closeAction: acceptModal,
      }
    : {
        title: t?.form_top_header_initial || "",
      };

  return (
    <TimeLimitsFormView
      initial={config.mustAccept}
      onClickOutroCta={acceptModal}
      formHeader={<ModalHeader {...headerProps} />}
    />
  );
}
