import * as React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "Models/modal";
import { ModalHeader } from "Components/RSModal";
import { useTranslations } from "Utils/hooks";
import { cmsSlug } from "../GameTypeExclusions.constants";
import { TTranslations } from "../GameTypeExclusions.types";
import { GameTypeExclusionsCardContainer } from "./GameTypeExclusionsCardContainer";

export function GameTypeExclusionsCardModal() {
  const dispatch = useDispatch();
  const t = useTranslations<TTranslations>(cmsSlug);

  return (
    <>
      <ModalHeader
        title={t.modal_header_mobile_edit}
        showBackButton
        backAction={() => dispatch(hideModal())}
      />
      <GameTypeExclusionsCardContainer readonly={false} />
    </>
  );
}
