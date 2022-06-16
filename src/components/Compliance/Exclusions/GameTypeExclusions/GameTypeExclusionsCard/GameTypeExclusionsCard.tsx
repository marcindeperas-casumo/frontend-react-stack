import * as React from "react";
import cx from "classnames";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import { TGameTypeExclusion } from "Models/playOkay";
import { GameTypeExclusionsForm } from "../GameTypeExclusionsForm";
import { TFormItem, TTranslations } from "../GameTypeExclusions.types";
import { GameTypeExclusionsCardHeader } from "./GameTypeExclusionsCardHeader";
import { GameTypeExclusionsCardReduced } from "./GameTypeExclusionsCardReduced";

type TProps = {
  t: TTranslations;
  readonly?: boolean;
  onMobileClickEdit: () => void;
  selectedCategories?: Array<TGameTypeExclusion>;
  FormItem: TFormItem;
};

export function GameTypeExclusionsCard({
  t,
  readonly,
  onMobileClickEdit,
  selectedCategories = [],
  FormItem,
}: TProps) {
  return (
    <div className={cx("flex flex-col", "my tablet:my-none")}>
      <GameTypeExclusionsCardHeader
        t={t}
        readonly={readonly}
        selectedCategories={selectedCategories}
      />
      <Mobile>
        {readonly ? (
          <GameTypeExclusionsCardReduced
            t={t}
            selectedCategories={selectedCategories}
            onClickEdit={onMobileClickEdit}
          />
        ) : (
          <GameTypeExclusionsForm
            t={t}
            selectedCategories={selectedCategories}
            Item={FormItem}
          />
        )}
      </Mobile>
      <TabletAndDesktop>
        <GameTypeExclusionsForm
          t={t}
          selectedCategories={selectedCategories}
          Item={FormItem}
        />
      </TabletAndDesktop>
    </div>
  );
}
