// @flow
import React, { useState } from "react";
import { pick } from "ramda";
import * as A from "Types/apollo";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableCard } from "Components/ValuableCard";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/valuables"' has no exported ... Remove this comment to see the full error message
import { type ValuableThumbnailTranslations as Translations } from "Models/valuables";

export const useValuableDetails = (
  translations: Translations,
  // @ts-expect-error ts-migrate(2348) FIXME: Value of type 'PromiseConstructor' is not callable... Remove this comment to see the full error message
  onConsumeValuable: string => Promise<void>
) => {
  const [selectedValuable, setSelectedValuable] = useState(null);
  const closeModal = () => {
    setSelectedValuable(null);
  };

  const showValuableDetails = (
    valuable: A.PlayerValuableList_PlayerValuable
  ) => {
    const valuableDetails = pick(
      [
        "__typename",
        "id",
        "awardType",
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
        "excludedGames",
        "title",
      ],
      valuable
    );
    setSelectedValuable(valuableDetails);
  };

  if (!selectedValuable) {
    return {
      detailsComponent: null,
      showValuableDetails: showValuableDetails,
    };
  }

  return {
    showValuableDetails,
    detailsComponent: (
      <ValuableDetailsWithModal
        isOpen={Boolean(selectedValuable)}
        onClose={closeModal}
        onConsumeValuable={onConsumeValuable}
        valuableDetails={selectedValuable}
      >
        <div className="c-valuable-details__valuable-card o-position--relative">
          <ValuableCard
            translations={translations}
            {...selectedValuable}
            caveat={null}
            className="t-elevation--10"
          />
        </div>
      </ValuableDetailsWithModal>
    ),
  };
};
