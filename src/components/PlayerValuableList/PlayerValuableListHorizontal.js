/* @flow */
import React, { useEffect, useState } from "react";
import { equals } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import { VALUABLE_TYPES, type ValuableType } from "Models/valuables";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { launchGame } from "Models/games";
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
  const [open, setOpen] = useState(false);
  const [selectedValuable, setSelectedValuable] = useState(valuables[0]);

  const showModal = valuable => {
    setSelectedValuable(valuable);
    setOpen(true);
  };

  const consumeValuable = ({
    id,
    valuableType,
    gameSlug,
  }: {
    id: string,
    valuableType: ValuableType,
    gameSlug: ?string,
  }) => {
    return onConsumeValuable(id).then(() => {
      if (equals(valuableType, VALUABLE_TYPES.SPINS)) {
        launchGame(gameSlug);
      }
    });
  };

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
    <div className="u-padding-top--xlg c-player-valuables-list">
      {listTitleLabel && (
        <ScrollableListTitle paddingLeft title={listTitleLabel} />
      )}
      <Scrollable>
        {valuables.map(valuable => {
          const { id } = valuable;

          return (
            <div key={`valuable-card-${id}`} id={`valuable-card-${id}`}>
              <div style={{ width: "160px" }}>
                <div>
                  <ValuableCard
                    translatedHoursUnit={hoursLabel}
                    {...valuable}
                    onCardClick={() => showModal(valuable)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Scrollable>

      <ValuableDetailsWithModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConsumeValuable={consumeValuable}
        valuableDetails={selectedValuable}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard
            translatedHoursUnit={hoursLabel}
            {...selectedValuable}
          />
        </div>
      </ValuableDetailsWithModal>
    </div>
  );
}

// eslint-disable-next-line fp/no-mutation
PlayerValuableListHorizontal.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
