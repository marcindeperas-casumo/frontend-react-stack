import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import { interpolate } from "Utils/utils";
import { TTranslations } from "../GameTypeExclusions.types";

type TPropsTranslations = Pick<
  TTranslations,
  "cancel_pending_revocation" | "pending_revocation_note"
>;

type TProps = {
  t: TPropsTranslations;
  revokeOnDate: DateTime;
  onClickCancel: () => Promise<any>;
};

export function ItemRevocationNote({ t, revokeOnDate, onClickCancel }: TProps) {
  return (
    <Text tag="span" size="sm" className="text-grey-50 tablet:text-grey-90">
      {interpolate(t.pending_revocation_note, {
        date: revokeOnDate.toFormat("ff"),
      })}{" "}
      <Text
        tag="span"
        size="sm"
        className="text-orange-30 cursor-pointer"
        onClick={onClickCancel}
      >
        {t.cancel_pending_revocation}
      </Text>
    </Text>
  );
}
