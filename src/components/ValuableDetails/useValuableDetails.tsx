import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { FetchResult } from "@apollo/client";
import { ValuableCardDetailsThumbnail } from "Components/ValuableDetails/ValuableCardDetailsThumbnail";
import { showModal } from "Models/modal";
import * as A from "Types/apollo";
import type { ValuableThumbnailTranslations as Translations } from "Models/valuables";

export const useValuableDetails = (
  translations: Translations,
  onConsumeValuable: (s: string) => Promise<FetchResult<A.UseValuableMutation>>
) => {
  const dispatch = useDispatch();
  const [
    selectedValuable,
    setSelectedValuable,
  ] = useState<A.PlayerValuableList_PlayerValuableFragment | null>(null);

  useEffect(() => {
    if (selectedValuable) {
      dispatch(
        showModal(
          "VALUABLE_DETAILS",
          { isWide: true },
          {
            translations,
            onConsumeValuable: onConsumeValuable,
            valuableDetails: selectedValuable,
            valuableItem: ValuableCardDetailsThumbnail(
              translations,
              selectedValuable
            ),
            onCloseModal: () => setSelectedValuable(null),
            onDismissModal: () => setSelectedValuable(null),
          }
        )
      );
    }
  }, [dispatch, onConsumeValuable, selectedValuable, translations]);

  return setSelectedValuable;
};
