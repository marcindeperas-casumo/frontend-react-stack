import * as React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import { useGetExclusionsQuery } from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { cmsSlug } from "../GameTypeExclusions.constants";
import { TTranslations } from "../GameTypeExclusions.types";
import { GameTypeExclusionsFormItem } from "../GameTypeExclusionsForm";
import { GameTypeExclusionsCard } from "./GameTypeExclusionsCard";

type TProps = {
  readonly?: boolean;
};

export function GameTypeExclusionsCardContainer({ readonly = true }: TProps) {
  const dispatch = useDispatch();
  const t = useTranslations<TTranslations>(cmsSlug);
  const { data } = useGetExclusionsQuery();

  if (!t) {
    return null;
  }

  return (
    <GameTypeExclusionsCard
      t={t}
      readonly={readonly}
      onMobileClickEdit={() =>
        dispatch(showModal(REACT_APP_MODAL.ID.PLAY_OKAY_GAME_TYPE_EXCLUSION))
      }
      selectedCategories={data}
      FormItem={GameTypeExclusionsFormItem}
    />
  );
}
