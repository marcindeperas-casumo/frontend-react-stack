import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import { TabletAndDesktop } from "Components/ResponsiveLayout";
import { Toggle } from "Components/Toggle/Toggle";
import { TGameType, TGameTypeExclusion } from "Models/playOkay";
import { TToggleCategory, TTranslations } from "../GameTypeExclusions.types";
import { ItemRevocationNote } from "./ItemRevocationNote";

type TPropsTranslations = Pick<
  TTranslations,
  "cancel_pending_revocation" | "pending_revocation_note"
>;

type TProps = {
  t: TPropsTranslations;
  type: TGameType;
  details: string;
  Icon: React.FunctionComponent;
  selectedCategory?: TGameTypeExclusion;
  select: TToggleCategory;
  isSelecting: boolean;
  unselect: TToggleCategory;
  isUnselecting: boolean;
  cancelUnselecting: TToggleCategory;
  isCancelling: boolean;
};

export function Item({
  t,
  type,
  details,
  Icon,
  selectedCategory,
  select,
  unselect,
  cancelUnselecting,
}: TProps) {
  const isSelected = Boolean(selectedCategory);
  const revokeOnDate = DateTime.fromISO(selectedCategory?.revokeOn);
  const pendingRevocation = selectedCategory?.revokeOn
    ? revokeOnDate.diffNow().as("hours") > 0
    : false;

  return (
    <div className="flex flex-row gap-md items-center">
      <TabletAndDesktop>
        <Icon />
      </TabletAndDesktop>
      <div className="flex flex-col gap-sm flex-grow">
        <Text tag="div" className="font-bold">
          {type}
        </Text>
        <Text tag="div" className="text-grey-50 tablet:text-grey-90">
          {details}
        </Text>
        {selectedCategory && pendingRevocation ? (
          <ItemRevocationNote
            t={t}
            revokeOnDate={revokeOnDate}
            onClickCancel={() => cancelUnselecting()}
          />
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <Toggle
        translate
        checked={isSelected}
        disabled={pendingRevocation}
        onChange={() => {
          if (isSelected) {
            if (pendingRevocation) {
              return;
            }

            return unselect();
          }

          select();
        }}
      />
    </div>
  );
}
