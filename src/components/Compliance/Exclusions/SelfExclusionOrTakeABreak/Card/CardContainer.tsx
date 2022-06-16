import * as React from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "Utils/hooks";
import {
  playOkaySuspendAccountCmsSlug,
  TPlayOkaySuspendAccountTranslations,
} from "Models/playOkay";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { Card } from "./Card";

export function CardContainer() {
  const dispatch = useDispatch();
  const t = useTranslations<TPlayOkaySuspendAccountTranslations>(
    playOkaySuspendAccountCmsSlug
  );

  return (
    <Card
      t={t}
      onClick={() =>
        dispatch(
          showModal(REACT_APP_MODAL.ID.PLAY_OKAY_EXCLUSION_SE_TAB_CHOOSER)
        )
      }
    />
  );
}
