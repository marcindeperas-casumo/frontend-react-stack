/* @flow */
import React, { useEffect, useState } from "react";
import { pick } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { subscribeToItemCreatedEvent } from "./utils";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";
import "./PlayerValuableListHorizontal.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const seeAllUrl = "player/valuables";

export function PlayerValuableListHorizontal(props: PlayerValuableListProps) {
  const {
    loading = false,
    valuables = [],
    translations = {},
    refetch = () => {},
    onConsumeValuable,
  } = props;
  const { listTitleLabel, seeAllLabel, noValuablesLabel } = translations;
  const [selectedValuable, setSelectedValuable] = useState(null);
  const valuableThumbnailTranslations = pick(
    ["hoursLabel", "minutesLabel"],
    translations
  );
  const noValuablesAvailable = !valuables.length;

  const showModal = valuable => {
    setSelectedValuable(valuable);
  };

  const closeModal = () => {
    setSelectedValuable(null);
  };

  const keyGetter = (i: number) => `valuable-card-${valuables[i].id}`;

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

  useEffect(() => {
    const handler = subscribeToItemCreatedEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  if (loading) {
    return <GameListHorizontalSkeleton />;
  }

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
