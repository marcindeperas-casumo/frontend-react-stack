import * as React from "react";
import { useDispatch } from "react-redux";
import {
  playOkaySuspendAccountCmsSlug,
  TPlayOkaySuspendAccountTranslations,
  useGetPlayerConfigQuery,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { hideModal, showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { Modal } from "./Modal";

export function ModalContainer() {
  const dispatch = useDispatch();
  const t = useTranslations<TPlayOkaySuspendAccountTranslations>(
    playOkaySuspendAccountCmsSlug
  );
  const { data: playOkayConfig } = useGetPlayerConfigQuery();
  const selfExclusion = playOkayConfig?.exclusions.find(
    exclusion => exclusion.type === "selfExclusion"
  );
  const takeABreak = playOkayConfig?.exclusions.find(
    exclusion => exclusion.type === "takeABreak"
  );

  return (
    <Modal
      t={t}
      primaryButton={{
        action: () =>
          dispatch(
            showModal(REACT_APP_MODAL.ID.PLAY_OKAY_SUSPEND_ACCOUNT_TAKE_A_BREAK)
          ),
        isDisabled: !takeABreak,
      }}
      secondaryButton={{
        action: () =>
          dispatch(
            showModal(
              REACT_APP_MODAL.ID.PLAY_OKAY_SUSPEND_ACCOUNT_SELF_EXCLUSION
            )
          ),
        isDisabled: !selfExclusion,
      }}
      closeIcon={{
        action: () => dispatch(hideModal()),
      }}
    />
  );
}
