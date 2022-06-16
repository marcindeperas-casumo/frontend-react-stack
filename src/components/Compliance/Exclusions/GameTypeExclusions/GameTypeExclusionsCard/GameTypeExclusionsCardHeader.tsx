import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import { TGameTypeExclusion } from "Models/playOkay";
import { TTranslations } from "../GameTypeExclusions.types";
import { GameTypeExclusionsCardCountBadge } from "./GameTypeExclusionsCardCountBadge";
import SpendingBudgetsIcon from "./icons/SpendingBudgets.svg";

type TProps = {
  t: Pick<TTranslations, "card_header" | "card_header_mobile_edit">;
  readonly?: boolean;
  selectedCategories: Array<TGameTypeExclusion>;
};

export function GameTypeExclusionsCardHeader({
  t,
  readonly,
  selectedCategories,
}: TProps) {
  return (
    <>
      <Mobile>
        <Text tag="div" className="font-bold bg-white p-md pb-lg">
          {readonly ? t.card_header : t.card_header_mobile_edit}
        </Text>
      </Mobile>
      <TabletAndDesktop>
        <div className={cx("flex gap items-center", "py-md tablet:py-lg")}>
          <SpendingBudgetsIcon />
          <Text tag="div" className="font-bold">
            {t.card_header}
          </Text>
          <GameTypeExclusionsCardCountBadge count={selectedCategories.length} />
        </div>
      </TabletAndDesktop>
    </>
  );
}
