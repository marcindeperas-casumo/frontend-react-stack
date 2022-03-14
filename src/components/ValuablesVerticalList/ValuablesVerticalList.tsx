import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import React from "react";
import classNames from "classnames";
import { ValuableRowContainer as ValuableRow } from "Components/ValuableRow";
import type { ValuableListProps } from "Models/valuables";
import { VALUABLE_STATES } from "Models/valuables";
import { useValuableDetails } from "Components/ValuableDetails/useValuableDetails";

const ValuableItemRenderer = (
  valuable,
  translations,
  onMoreInfo,
  onConsumeValuable,
  onItemClick,
  isItemSelectable?
) => {
  const itemDescription = valuable.content;

  const onClick = onItemClick
    ? () => onItemClick(valuable.id)
    : () => onMoreInfo(valuable);

  const isSelected =
    isItemSelectable &&
    (valuable.valuableState === VALUABLE_STATES.USED ||
      valuable.parentValuableState === VALUABLE_STATES.USED);

  return (
    <div className="u-padding-y--md">
      <ValuableRow
        key={`available-valuable-row-${valuable.id}`}
        translations={translations}
        {...valuable}
        description={itemDescription}
        onMoreInfo={() => onMoreInfo(valuable)}
        onClick={onClick}
        isSelected={isSelected}
      />
    </div>
  );
};

export const ValuablesVerticalList = ({
  title,
  valuables,
  translations,
  className,
  onConsumeValuable,
  onItemClick,
  isItemSelectable,
}: ValuableListProps) => {
  const setSelectedValuable = useValuableDetails(
    translations,
    onConsumeValuable
  );

  return (
    <div className={classNames(className, "bg-white")}>
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
            ValuableItemRenderer(
              valuable,
              translations,
              setSelectedValuable,
              onConsumeValuable,
              onItemClick,
              isItemSelectable
            )
          }
        />
      )}
    </div>
  );
};
