import * as React from "react";
import cx from "classnames";
import {
  TGameTypeExclusion,
  availableGameTypesForExclusion,
} from "Models/playOkay";
import { TTranslations, TFormItem } from "../GameTypeExclusions.types";
import { availableGameTypes } from "../GameTypeExclusions.constants";
import { selectTypeTranslations } from "./GameTypeExclusionsForm.utils";

type TProps = {
  t: Pick<
    TTranslations,
    | "available_game_types"
    | "pending_revocation_note"
    | "cancel_pending_revocation"
  >;
  selectedCategories: Array<TGameTypeExclusion>;
  Item: TFormItem;
};

export function GameTypeExclusionsForm({
  t,
  selectedCategories,
  Item,
}: TProps) {
  return (
    <div
      className={cx(
        "grid tablet:grid-cols-2 gap-md tablet:gap-2xlg",
        "bg-white",
        "p-md tablet:p-lg tablet:rounded-2xl"
      )}
    >
      {availableGameTypes
        .filter(props =>
          availableGameTypesForExclusion.DEFAULT.includes(props.type)
        )
        .map(props => ({
          ...props,
          ...selectTypeTranslations({ type: props.type, t }),
        }))
        .map(props => (
          <Item
            {...props}
            t={t}
            key={props.type}
            selectedCategory={selectedCategories.find(
              item => item.gameType === props.type
            )}
          />
        ))}
    </div>
  );
}
