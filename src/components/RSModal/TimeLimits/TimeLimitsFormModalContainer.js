// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslationsGql } from "Utils/hooks";
import {
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
  allLoginTimeLimitsDefinedSelector,
} from "Models/playOkay";
import { TimeLimitsFormViewContainer } from "Components/Compliance/Sweden/TimeLimits";
import { ModalHeader } from "Components/RSModal";

type Props = {
  acceptModal: () => void,
};

export function TimeLimitsFormModalContainer({ acceptModal }: Props) {
  const allLimitsDefined = useSelector(allLoginTimeLimitsDefinedSelector);
  const { t } = useTranslationsGql({
    form_top_header_initial: `${cmsKeyPrefix}form_top_header_initial`,
    form_top_header_edit: `${cmsKeyPrefix}form_top_header_edit`,
  });
  const headerProps = allLimitsDefined
    ? {
        title: t?.form_top_header_edit || "",
        showCloseButton: true,
        closeAction: acceptModal,
      }
    : {
        title: t?.form_top_header_initial || "",
      };

  return (
    <TimeLimitsFormViewContainer
      onClickOutroCta={acceptModal}
      formHeader={<ModalHeader {...headerProps} />}
    />
  );
}
