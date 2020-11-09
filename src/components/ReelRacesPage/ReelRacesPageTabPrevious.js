// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard/ReelRaceScheduleCard";
import { ReelRacesPageQuery } from "./ReelRacesPageContainer.graphql";
import type { ReelRacesContentPage } from "./ReelRacesPage";

type Props = {
  t: ?ReelRacesContentPage,
};

export function ReelRacesPageTabPrevious({ t }: Props) {
  const { data } = useQuery<
    A.ReelRacesPageQuery,
    A.ReelRacesPageQueryVariables
  >(ReelRacesPageQuery, {
    variables: {
      limit: 20,
      previous: true,
    },
  });

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return (
      <div>
        {reelRaces.map((reelRace, i) => (
          <div key={reelRace.id}>
            {i === 1 && (
              <Flex align="center" className="u-padding-x--md u-padding-top">
                <div className="u-width u-height t-border-r--circle t-background-green-30"></div>
                <Text className="u-padding-left u-font-weight-bold" tag="div">
                  Right Now
                </Text>
              </Flex>
            )}
            {i === 2 && (
              <Flex align="center" className="u-padding-x--md u-padding-top">
                <div className="u-width u-height t-border-r--circle t-background-yellow-30"></div>
                <Text className="u-padding-left u-font-weight-bold" tag="div">
                  Up Next
                </Text>
              </Flex>
            )}
            <ReelRaceScheduleCard
              key={reelRace.id}
              reelRace={reelRace}
              t={t}
              isOpen={i === 0 || i === 1}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
