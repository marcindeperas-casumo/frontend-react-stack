// @flow
import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import Scrollable from "@casumo/cmp-scrollable";
import * as A from "Types/apollo";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { usePlayerValuableList } from "./usePlayerValuableList";
import { UseValuable } from "./PlayerValuables.graphql";

import "./PlayerValuableListHorizontal.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const seeAllUrl = "/player/valuables";

export function PlayerValuableListHorizontal() {
  const { loading, valuables, translations } = usePlayerValuableList();
  const [mutateValuable] = useMutation<A.UseValuable, A.UseValuableVariables>(
    UseValuable
  );
  const consumeValuable = (id: string) =>
    mutateValuable({
      variables: {
        id,
        source: "mobile",
      },
    });
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const showModal = setSelectedValuable;
  const closeModal = () => setSelectedValuable(null);

  if (loading || !translations) {
    return <GameListHorizontalSkeleton />;
  }

  const { listTitleLabel, seeAllLabel, noValuablesLabel } = translations;
  const noValuablesAvailable = !valuables.length;

  const keyGetter = (i: number) => valuables[i].id;

  const itemRenderer = (i: number) => (
    <div id={`valuable-card-${valuables[i].id}`}>
      <div className="c-valuable-list__valuable-card u-margin-bottom--sm">
        <ValuableCard
          {...valuables[i]}
          translations={translations}
          onCardClick={() => showModal(valuables[i])}
          className="t-elevation--10"
        />
      </div>
    </div>
  );

  return (
    <div className="u-padding-top--xlg c-player-valuables-list u-padding-bottom--xlg">
      <ScrollableListTitleRow
        paddingLeft
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

          {selectedValuable && (
            <ValuableDetailsWithModal
              isOpen={Boolean(selectedValuable)}
              onClose={closeModal}
              onConsumeValuable={consumeValuable}
              valuableDetails={selectedValuable}
            >
              <div className="c-valuable-details__valuable-card">
                <ValuableCard
                  {...selectedValuable}
                  translations={translations}
                  caveat={null}
                  className="t-elevation--30"
                />
              </div>
            </ValuableDetailsWithModal>
          )}
        </>
      )}
    </div>
  );
}
