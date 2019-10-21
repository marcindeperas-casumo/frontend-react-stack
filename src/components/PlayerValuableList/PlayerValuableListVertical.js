/* @flow */
import * as React from "react";
import { VALUABLE_STATES, getValuablesByState } from "Models/valuables";
import logger from "Services/logger";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import SectionList from "Components/SectionList";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableRow } from "Components/ValuableRow";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
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
  const {
    availableListTitleLabel,
    lockedListTitleLabel,
    noValuablesLabel,
  } = translations;
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const getAvailableValuables = getValuablesByState(VALUABLE_STATES.FRESH);
  const getLockedValuables = getValuablesByState(VALUABLE_STATES.LOCKED);
  const sections = [
    {
      title: availableListTitleLabel,
      data: getAvailableValuables(valuables),
    },
    {
      title: lockedListTitleLabel,
      data: getLockedValuables(valuables),
    },
  ].filter(section => section.data.length > 0);

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

  if (loading) {
    return <GameRowSkeleton />;
  }

  return (
    <div className="u-padding-top--lg c-player-valuables-list u-padding-bottom--lg t-background-white">
      {sections.length > 0 ? (
        <SectionList
          className="u-padding-x--md"
          sections={sections}
          renderItem={valuable => (
            <div className="u-padding-y--md">
              <ValuableRow
                key={`available-valuable-row-${valuable.id}`}
                translations={translations}
                {...valuable}
                onClick={() => setSelectedValuable(valuable)}
              />
            </div>
          )}
        />
      ) : (
        <EmptyValuablesList message={noValuablesLabel} />
      )}

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
              className="t-box-shadow--lg"
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </div>
  );
}
