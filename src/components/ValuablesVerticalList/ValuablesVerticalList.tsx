// @flow
import React from "react";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { ValuableRow } from "Components/ValuableRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/valuables"' has no exported ... Remove this comment to see the full error message
import { type ValuableListProps, VALUABLE_STATES } from "Models/valuables";
import { useValuableDetails } from "Components/ValuableDetails/useValuableDetails";

const valuableItemRenderer = (
  valuable,
  translations,
  onMoreInfo,
  onConsumeValuable,
  onItemClick?,
  isItemSelectable
) => {
  const itemDescription =
    valuable.__typename === "PlayerValuableSpins"
      ? valuable.description
      : valuable.content;
  const moreInfo = () => onMoreInfo(valuable);
  const itemClick = onItemClick ? () => onItemClick(valuable.id) : moreInfo;
  const isSelected =
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'USED' does not exist on type '{}'.
    isItemSelectable && valuable.valuableState === VALUABLE_STATES.USED;

  return (
    <div className="u-padding-y--md">
      <ValuableRow
        key={`available-valuable-row-${valuable.id}`}
        translations={translations}
        {...valuable}
        description={itemDescription}
        onMoreInfo={moreInfo}
        onClick={itemClick}
        isSelected={isSelected}
      />
    </div>
  );
};

export const ValuablesVerticalList = ({
  title,
  valuables,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'translations' does not exist on type 'Va... Remove this comment to see the full error message
  translations,
  loading,
  className,
  onConsumeValuable,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'onItemClick' does not exist on type 'Val... Remove this comment to see the full error message
  onItemClick,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isItemSelectable' does not exist on type... Remove this comment to see the full error message
  isItemSelectable,
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
        <Text className="u-font-weight-bold u-padding-y--lg u-margin-bottom--none u-padding-x--md">
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
              onItemClick,
              isItemSelectable
            )
          }
        />
      )}
      {detailsComponent}
    </div>
  );
};
