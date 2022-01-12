import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { EditIcon } from "@casumo/cmp-icons";
import { TGameTypeExclusion } from "Models/playOkay";
import { TTranslations } from "../GameTypeExclusions.types";
import { GameTypeExclusionsCardCountBadge } from "./GameTypeExclusionsCardCountBadge";

type TPropsTranslations = Pick<
  TTranslations,
  | "card_reduced_header_none_selected"
  | "card_reduced_header_some_selected"
  | "card_reduced_subheader"
>;

type TProps = {
  t: TPropsTranslations;
  selectedCategories: Array<TGameTypeExclusion>;
  onClickEdit: () => void;
};

export function GameTypeExclusionsCardReduced({
  t,
  selectedCategories,
  onClickEdit,
}: TProps) {
  return (
    <div
      className={cx("flex flex-row gap-md items-center", "bg-white", "p-md")}
    >
      <GameTypeExclusionsCardCountBadge count={selectedCategories.length} />
      <SelectedCategories
        className="flex-grow"
        selectedCategories={selectedCategories}
        t={t}
      />
      <ButtonSecondary
        borderRadius="circle"
        icon={<EditIcon />}
        size="sm"
        onClick={onClickEdit}
      />
    </div>
  );
}

type TSelectedCategoriesProps = {
  t: TPropsTranslations;
  className?: string;
  selectedCategories: Array<TGameTypeExclusion>;
};

function SelectedCategories({
  t,
  className,
  selectedCategories,
}: TSelectedCategoriesProps) {
  const someSelected = selectedCategories.length > 0;

  return (
    <div className={cx("flex flex-col", className)}>
      <Text tag="div" className="font-bold">
        {someSelected
          ? t.card_reduced_header_some_selected
          : t.card_reduced_header_none_selected}
      </Text>
      <Text size="xs" tag="div">
        {someSelected
          ? selectedCategories.map(item => item.gameType).join(", ")
          : t.card_reduced_subheader}
      </Text>
    </div>
  );
}
