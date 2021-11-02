import React, { useState } from "react";
import { pick } from "ramda";
import * as A from "Types/apollo";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableCard } from "Components/ValuableCard";
import type { ValuableThumbnailTranslations as Translations } from "Models/valuables";

export const useValuableDetails = (
  translations: Translations,
  onConsumeValuable: (s: string) => Promise<void>
) => {
  const [selectedValuable, setSelectedValuable] = useState(null);
  const closeModal = () => {
    setSelectedValuable(null);
  };

  const showValuableDetails = (
    valuable: A.PlayerValuableList_PlayerValuableFragment
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
        "specificTerms",
        "valuableType",
        "valuableState",
        "wageringThreshold",
        "leftToWager",
        "requirementType",
        "termsLink",
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
