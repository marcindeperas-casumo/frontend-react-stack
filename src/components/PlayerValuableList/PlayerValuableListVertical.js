/* @flow */
import * as React from "react";
import { VALUABLE_STATES, getValuablesByState } from "Models/valuables";
import logger from "Services/logger";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import SectionList from "Components/SectionList";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableRow } from "Components/ValuableRow";
import { subscribeToItemCreatedEvent } from "./utils";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";
import "./PlayerValuableListHorizontal.scss";

export function PlayerValuableListVertical(props: PlayerValuableListProps) {
  const {
    error,
    loading = false,
    valuables = [],
    translations,
    refetch = () => {},
    onConsumeValuable,
  } = props;
  const { availableListTitleLabel, lockedListTitleLabel } = translations;
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const getAvailableValuables = getValuablesByState(VALUABLE_STATES.FRESH);
  const getLockedValuables = getValuablesByState(VALUABLE_STATES.LOCKED);

  const closeModal = () => {
    setSelectedValuable(null);
  };

  React.useEffect(() => {
    const handler = subscribeToItemCreatedEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  }, [refetch]);

  if (error) {
    logger.error("PlayerValuableListVertical failed", error);
    return null;
  }

  if (loading) {
    return <GameRowSkeleton />;
  }

  return (
    <div className="u-padding-top--lg c-player-valuables-list u-padding-bottom--lg t-background-white">
      <SectionList
        sections={[
          {
            title: availableListTitleLabel,
            data: getAvailableValuables(valuables),
          },
          {
            title: lockedListTitleLabel,
            data: getLockedValuables(valuables),
          },
        ]}
        renderItem={valuable => (
          <ValuableRow
            key={`available-valuable-row-${valuable.id}`}
            translations={translations}
            {...valuable}
            onClick={() => setSelectedValuable(valuable)}
          />
        )}
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
              translations={translations}
              {...selectedValuable}
              caveat={null}
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </div>
  );
}
