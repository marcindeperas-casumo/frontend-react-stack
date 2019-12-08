// @flow
import React from "react";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { ValuableRow } from "Components/ValuableRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { type ValuableListProps } from "Models/valuables";
import { useValuableDetails } from "Components/ValuableDetails/useValuableDetails";

const valuableItemRenderer = (
  valuable,
  translations,
  onMoreInfo?,
  onConsumeValuable,
  onItemClick?
) => {
  const itemDescription =
    valuable.__typename === "PlayerValuableSpins"
      ? valuable.description
      : valuable.content;
  const moreInfo = onMoreInfo ? () => onMoreInfo(valuable) : undefined;
  const itemClick = onItemClick ? () => onItemClick(valuable.id) : undefined;

  return (
    <div className="u-padding-y--md">
      <ValuableRow
        key={`available-valuable-row-${valuable.id}`}
        translations={translations}
        {...valuable}
        description={itemDescription}
        onMoreInfo={moreInfo}
        onClick={itemClick}
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
  onItemClick,
}: ValuableListProps) => {
  const { detailsComponent, showValuableDetails } = useValuableDetails(
    translations,
    onConsumeValuable
  );

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <div className={classNames(className, "t-background-white")}>
      {title && (
        <Text className="u-font-weight-bold u-padding-y--lg u-margin-bottom--none">
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
              onConsumeValuable,
              onItemClick
            )
          }
        />
      )}
      {detailsComponent}
    </div>
  );
};
