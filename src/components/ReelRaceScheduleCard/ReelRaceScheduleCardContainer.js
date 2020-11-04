// @flow
import React from "react";
import * as A from "Types/apollo";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";

type Props = {
  reelRace: A.ReelRaceCard_ReelRace,
};

export const ReelRaceScheduleCardContainer = ({ reelRace }: Props) => {
  return <ReelRaceScheduleCard reelRace={reelRace} />;
};
