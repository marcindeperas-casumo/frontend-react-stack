import { useMutation } from "@apollo/client";
import Scrollable from "@casumo/cmp-scrollable";
import * as React from "react";
import * as A from "Types/apollo";
import { getPlatform } from "Utils";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { useValuableDetails } from "Components/ValuableDetails/useValuableDetails";
import { usePlayerValuableList } from "./usePlayerValuableList";
import { UseValuable } from "./PlayerValuables.graphql";

import "./PlayerValuableListHorizontal.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "md",
  desktop: "none",
};

const seeAllUrl = "/player/valuables";

export function PlayerValuableListHorizontal() {
  const { loading, valuables, translations } = usePlayerValuableList();
  const [mutateValuable] = useMutation<
    A.UseValuableMutation,
    A.UseValuableMutationVariables
  >(UseValuable);
  const consumeValuable = (id: string) =>
    mutateValuable({
      variables: {
        id,
        source: getPlatform(),
      },
    });
  const setSelectedValuable = useValuableDetails(translations, consumeValuable);

  if (loading || !translations) {
    return <GameListHorizontalSkeleton />;
  }

  const { listTitleLabel, seeAllLabel, noValuablesLabel } = translations;
  const noValuablesAvailable = !valuables.length;

  const keyGetter = (i: number) => valuables[i].id;

  const itemRenderer = (i: number) => (
    <div id={`valuable-card-${valuables[i].id}`}>
      <div className="c-valuable-list__valuable-card u-margin-bottom--sm">
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <ValuableCard
          {...valuables[i]}
          valuableBadgeName={valuables[i]?.rule?.name}
          translations={translations}
          onCardClick={() => setSelectedValuable(valuables[i])}
          className="t-elevation--10"
        />
      </div>
    </div>
  );

  return (
    <div className="u-padding-top--xlg c-player-valuables-list u-padding-bottom--xlg">
      <ScrollableListTitleRow
        paddingLeft
        paddingPerDevice={PADDING_PER_DEVICE}
        seeMore={{
          text: noValuablesAvailable ? "" : seeAllLabel,
          url: seeAllUrl,
        }}
        title={listTitleLabel}
      />
      {noValuablesAvailable ? (
        <EmptyValuablesList message={noValuablesLabel} />
      ) : (
        <>
          <Scrollable
            numberOfItems={valuables.length}
            keyGetter={keyGetter}
            itemRenderer={itemRenderer}
            padding={PADDING_PER_DEVICE}
          />
        </>
      )}
    </div>
  );
}
