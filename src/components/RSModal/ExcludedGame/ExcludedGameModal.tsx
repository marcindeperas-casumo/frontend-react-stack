import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import { ButtonPrimary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { ModalConfig } from "Models/modal";
import { ModalTranslations } from "./ExcludedGameModalContainer";

type Props = {
  t: ModalTranslations;
  config: ModalConfig;
  onClick: Function;
  closeModal: Function;
};

export function ExcludedGameModal({ t, config, closeModal, onClick }: Props) {
  return (
    <CudlModal
      closeIcon={{
        action: closeModal,
        className: "bg-grey-20 t-border-r--circle u-padding--sm",
      }}
    >
      <img
        className="u-display--block"
        width={79}
        height={49}
        alt="Play okay logo"
        src={t.play_okay_logo}
        style={{ marginTop: 95 }}
      />
      <Text className="u-font-md u-font-weight-bold u-margin-bottom">
        {t.excluded_game_text_title}
      </Text>
      <Text className="u-margin-top--none">{t.excluded_game_text || ""}</Text>
      <ButtonPrimary
        size="sm"
        className="u-width--full u-margin-bottom--lg"
        onClick={onClick}
        style={{ marginTop: 295 }}
      >
        {t.redirect_button_text}
      </ButtonPrimary>
    </CudlModal>
  );
}
