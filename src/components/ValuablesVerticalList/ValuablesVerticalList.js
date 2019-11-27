// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { pick } from "ramda";
import * as A from "Types/apollo";
import { ValuableRow } from "Components/ValuableRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableCard } from "Components/ValuableCard";
import { type ValuableListProps } from "Models/valuables";

const valuableItemRenderer = (
  valuable,
  translations,
  onMoreInfo,
  onConsumeValuable
) => {
  const itemDescription =
    valuable.__typename === "PlayerValuableSpins"
      ? valuable.description
      : valuable.content;

  return (
    <div className="u-padding-y--md">
      <ValuableRow
        key={`available-valuable-row-${valuable.id}`}
        translations={translations}
        {...valuable}
        description={itemDescription}
        onMoreInfo={() => onMoreInfo(valuable)}
      />
    </div>
  );
};

export const ValuablesVerticalList = ({
  title,
  valuables,
  translations,
  loading,
  className,
  onConsumeValuable,
}: ValuableListProps) => {
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const closeModal = () => {
    setSelectedValuable(null);
  };

  const showValuableDetails = (
    valuable: A.PlayerValuableList_PlayerValuable
  ) => {
    const valuableDetails = pick(
      [
        "id",
        "backgroundImage",
        "content",
        "caveat",
        "currency",
        "market",
        "expiryDate",
        "valuableType",
        "valuableState",
        "wageringThreshold",
        "leftToWager",
        "requirementType",
        "title",
      ],
      valuable
    );
    setSelectedValuable(valuableDetails);
  };

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <div
      className={classNames(
        className,
        "c-player-valuables-list u-padding-bottom--lg t-background-white"
      )}
    >
      <Flex direction="vertical" spacing="none">
        {title && (
          <Text
            tag="p"
            className="u-font-weight-bold u-padding-y--lg u-margin-bottom--none"
          >
            {title}
          </Text>
        )}
        {valuables?.length && (
          <List
            itemSpacing="none"
            items={valuables}
            render={valuable =>
              valuableItemRenderer(
                valuable,
                translations,
                showValuableDetails,
                onConsumeValuable
              )
            }
          />
        )}
      </Flex>

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
};
