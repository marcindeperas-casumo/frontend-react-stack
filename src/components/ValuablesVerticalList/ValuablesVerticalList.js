// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { ValuableRow } from "Components/ValuableRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableCard } from "Components/ValuableCard";

type Props = {
  className?: string,
  loading: boolean,
  title?: string,
  translations: any[], // TODO: set type
  valuables: any[], // TODO: set type
  onConsumeValuable?: () => {},
};

const valuableItemRenderer = (valuable, translations, onClick) => (
  <div className="u-padding-y--md">
    <ValuableRow
      key={`available-valuable-row-${valuable.id}`}
      translations={translations}
      {...valuable}
      onClick={() => onClick(valuable)}
    />
  </div>
);

export const ValuablesVerticalList = ({
  title,
  valuables,
  translations,
  loading,
  className,
  onConsumeValuable,
}: Props) => {
  const [selectedValuable, setSelectedValuable] = React.useState(null);
  const closeModal = () => {
    setSelectedValuable(null);
  };

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <div
      className={classNames(
        className,
        "u-padding-top--lg c-player-valuables-list u-padding-bottom--lg t-background-white"
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
              valuableItemRenderer(valuable, translations, setSelectedValuable)
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
