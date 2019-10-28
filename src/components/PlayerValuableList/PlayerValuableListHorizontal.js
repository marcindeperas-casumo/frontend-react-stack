// @flow
import * as React from "react";
import * as R from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { usePlayerValuableList } from "./usePlayerValuableList";
import "./PlayerValuableListHorizontal.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const seeAllUrl = "player/valuables";

export function PlayerValuableListHorizontal() {
  const {
    loading,
    valuables,
    translations,
    onConsumeValuable,
  } = usePlayerValuableList();
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const showModal = setSelectedValuable;
  const closeModal = () => setSelectedValuable(null);

  if (loading) {
    return <GameListHorizontalSkeleton />;
  }

  const { listTitleLabel, seeAllLabel, noValuablesLabel } = translations;
  const valuableThumbnailTranslations = R.pick(
    ["hoursLabel", "minutesLabel"],
    translations
  );
  const noValuablesAvailable = !valuables.length;

  const keyGetter = (i: number) => valuables[i].id;

  const itemRenderer = (i: number) => (
    <div id={`valuable-card-${valuables[i].id}`}>
      <div className="c-valuable-list__valuable-card">
        <ValuableCard
          {...valuables[i]}
          translations={valuableThumbnailTranslations}
          onCardClick={() => showModal(valuables[i])}
          className="t-box-shadow"
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
              onConsumeValuable={onConsumeValuable}
              valuableDetails={selectedValuable}
            >
              <div className="c-valuable-list__valuable-card">
                <ValuableCard
                  {...selectedValuable}
                  translations={valuableThumbnailTranslations}
                  caveat={null}
                  className="t-box-shadow--lg"
                />
              </div>
            </ValuableDetailsWithModal>
          )}
        </>
      )}
    </div>
  );
}
