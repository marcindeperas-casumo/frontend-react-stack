/* @flow */
import React, { useEffect, useState } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES, getCardUrl } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop } from "Utils";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
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
          const { id, valuableState, valuableType } = valuable;
          const shouldUseValuable =
            valuableType === VALUABLE_TYPES.SPINS ||
            valuableType === VALUABLE_TYPES.CASH;

          // href={getCardUrl(valuableState, valuableType)}

          return (
            <div key={`valuable-card-${id}`} id={`valuable-card-${id}`}>
              <div style={{ width: "160px" }}>
                <div>
                  <ValuableCard
                    translatedHoursUnit={hoursLabel}
                    {...valuable}
                    onCardClick={() => setOpen(true)}
                  />
                </div>
              </div>
              <ValuableDetailsWithModal
                isOpen={open}
                onClose={() => setOpen(false)}
                {...valuable} // TODO: pick only detail related
              >
                <div style={{ width: "160px" }}>
                  <ValuableCard
                    translatedHoursUnit={hoursLabel}
                    {...valuable}
                    // onCardClick={shouldUseValuable ? () => onConsumeValuable(id) : noop}
                  />
                </div>
              </ValuableDetailsWithModal>
            </div>
          );
        })}
      </Scrollable>
    </div>
  );
}

// const DetailsModal = ({ hoursLabel, isOpen, ...valuable }) => (
//   <ValuableDetailsWithModal
//     isOpen={open}
//     onClose={() => {}}
//     {...valuable} // TODO: pick only detail related
//   >
//     <ValuableCard
//       translatedHoursUnit={hoursLabel}
//       {...valuable}
//       // onCardClick={shouldUseValuable ? () => onConsumeValuable(id) : noop}
//     />
//   </ValuableDetailsWithModal>
// );

// eslint-disable-next-line fp/no-mutation
PlayerValuableListHorizontal.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
