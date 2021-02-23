// @flow
import * as React from "react";
import { useTranslationsGql } from "Utils/hooks";
import { loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix } from "Models/playOkay";
import { TimeLimitsFormView } from "Components/Compliance/Sweden/TimeLimits";
import { ModalHeader } from "Components/RSModal";

type Props = {
  acceptModal: () => void,
  config: {
    mustAccept?: boolean,
  },
};

export function TimeLimitsFormModalContainer({ acceptModal, config }: Props) {
  const { t } = useTranslationsGql({
    form_top_header_initial: `${cmsKeyPrefix}form_top_header_initial`,
    form_top_header_edit: `${cmsKeyPrefix}form_top_header_edit`,
  });
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
