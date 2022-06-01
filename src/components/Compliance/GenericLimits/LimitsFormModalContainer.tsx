import * as React from "react";
import { TLimitGroup } from "Models/playOkay/config/config.types";
import { ModalHeader } from "Components/RSModal";
import { useTranslations } from "Utils/hooks";
import {
  playOkaySettingsCmsSlug,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { LimitsFormView } from "./LimitsFormView";

type Props = {
  acceptModal: () => void;
  config: {
    mustAccept?: boolean;
    input?: any;
  };
};

export function LimitsFormModalContainer({ acceptModal, config }: Props) {
  const t = useTranslations<TPlayOkaySettingsTranslations>(
    playOkaySettingsCmsSlug
  );
  const { limitGroup = "" } = config.input ?? {};

  return (
    <>
      <ModalHeader
        showCloseButton
        closeAction={() => config.mustAccept || acceptModal()}
        title={t?.[`title_${limitGroup.split("/")[1]?.toLowerCase()}`]}
      />
      <LimitsFormView
        limitGroup={limitGroup as TLimitGroup}
        onClickOutroCta={acceptModal}
      />
    </>
  );
}
