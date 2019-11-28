// @flow
import React, { useState } from "react";
import { pick } from "ramda";
import * as A from "Types/apollo";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableCard } from "Components/ValuableCard";

export const useValuableDetails = (
  translations: any,
  onConsumeValuable: string => any
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
        <div className="c-valuable-list__valuable-card">
          <ValuableCard
            translations={translations}
            {...selectedValuable}
            caveat={null}
            className="t-box-shadow--lg"
          />
        </div>
      </ValuableDetailsWithModal>
    ),
  };
};
