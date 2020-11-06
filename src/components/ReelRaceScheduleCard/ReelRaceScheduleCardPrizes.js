// @flow
import * as React from "react";
import { LaurelIcon } from "@casumo/cmp-icons";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";

type Props = {
  formattedPrizes: Array<string>,
  t: ReelRacesContentPage,
};

export function ReelRaceScheduleCardPrizes({ formattedPrizes, t }: Props) {
  // console.log(formattedPrizes);

  return (
    <>
      <LaurelIcon />
      formattedPrizes
    </>
  );
}
