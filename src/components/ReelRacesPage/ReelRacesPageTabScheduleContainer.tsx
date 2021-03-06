import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { filter, propEq, anyPass } from "ramda";
import * as A from "Types/apollo";
import { RACE_STATE } from "Models/reelRaces";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard";
import { ReelRacesPageTabScheduleQuery } from "./ReelRacesPageTabScheduleContainer.graphql";
import type { TReelRacesContentPage } from "./ReelRacesPageContainer";
import { ReelRacesPageTabSchedule } from "./ReelRacesPageTabSchedule";

type Props = {
  t: TReelRacesContentPage | null;
};

export function ReelRacesPageTabScheduleContainer({ t }: Props) {
  const [execReelRacesQuery, { data }] = useLazyQuery<
    A.ReelRacesPageTabScheduleQuery,
    A.ReelRacesPageTabScheduleQueryVariables
  >(ReelRacesPageTabScheduleQuery, {
    variables: {
      limit: 30,
    },
  });
  const [reelRaces, setReelRaces] = React.useState<
    Array<A.ReelRaceScheduleCard_ReelRaceFragment>
  >([]);

  React.useEffect(() => {
    execReelRacesQuery();
  }, [execReelRacesQuery]);

  React.useEffect(() => {
    if (data?.reelRaces) {
      const scheduledReelRaces = filter(
        anyPass([
          propEq("status", RACE_STATE.SCHEDULED),
          propEq("status", RACE_STATE.STARTED),
        ])
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ id: string; } & ReelRaceSched... Remove this comment to see the full error message
      )(data.reelRaces);

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Record<"status", any>[] | Dictio... Remove this comment to see the full error message
      setReelRaces(scheduledReelRaces);
    }
  }, [data]);

  if (!reelRaces.length) {
    return null;
  }

  return (
    <ReelRacesPageTabSchedule
      cardComponent={ReelRaceScheduleCard}
      reelRaces={reelRaces}
      t={t}
    />
  );
}
