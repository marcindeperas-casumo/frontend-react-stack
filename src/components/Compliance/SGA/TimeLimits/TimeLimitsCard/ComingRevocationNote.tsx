import Text from "@casumo/cmp-text";
import * as React from "react";
import { DateTime } from "luxon";
import type { TLoginTimeLimit } from "Models/playOkay";
import { interpolate } from "Utils";

type Props = {
  t: {
    coming_revocation_note: string | undefined;
  };
  limit: TLoginTimeLimit;
};

export function ComingRevocationNote({ t, limit }: Props) {
  if (!limit.comingRevocation) {
    return null;
  }

  const revocationDate = DateTime.fromMillis(
    limit.comingRevocation?.revocationTime
  );

  return (
    <Text tag="div" size="sm" className="text-yellow-30">
      {interpolate(t.coming_revocation_note ?? "", {
        date: revocationDate.toFormat("DD"),
      })}
    </Text>
  );
}
