/* @flow */
import React, { useEffect } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop } from "Utils";
import { getCardUrl } from "Components/ValuableCard/ValuableCard.utils";
import { subscribeToItemCreatedEvent } from "./utils";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";

export function PlayerValuableListHorizontal(props: PlayerValuableListProps) {
  const {
    error,
    loading,
    valuables,
    translations,
    refetch,
    onConsumeValuable,
  } = props;
  const { listTitleLabel, hoursLabel } = translations;

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

  if (error) {
    logger.error(`
      PlayerValuableListHorizontal failed:
      ${error}
    `);
    return null;
  }

  if (loading) {
    return <GameListHorizontalSkeleton />;
  }

  return (
    <div className="u-padding-top--xlg">
      {listTitleLabel && (
        <ScrollableListTitle paddingLeft title={listTitleLabel} />
      )}
      <Scrollable>
        {valuables.map(valuable => {
          const { id, valuableState, valuableType } = valuable;
          const shouldUseValuable =
            valuableType === VALUABLE_TYPES.SPINS ||
            valuableType === VALUABLE_TYPES.CASH;

          return (
            <a
              href={getCardUrl(valuableState, valuableType)}
              key={`valuable-card-${id}`}
            >
              <ValuableCard
                translatedHoursUnit={hoursLabel}
                {...valuable}
                onCardClick={
                  shouldUseValuable ? () => onConsumeValuable(id) : noop
                }
              />
            </a>
          );
        })}
      </Scrollable>
    </div>
  );
}

// eslint-disable-next-line fp/no-mutation
PlayerValuableListHorizontal.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
