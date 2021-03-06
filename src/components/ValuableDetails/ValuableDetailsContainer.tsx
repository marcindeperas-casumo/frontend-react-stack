import React from "react";
import { useSelector } from "react-redux";
import { FetchResult } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks";
import { playerIdSelector } from "Models/handshake";
import { ValuableDetails } from "./ValuableDetails";

type Props = {
  children: React.ReactChild;
  valuableDetails: A.ValuableDetails_PlayerValuableFragment;
  onConsumeValuable: (
    id: string
  ) => Promise<FetchResult<A.UseValuableMutation>>;
};

const getSlugOrDefault = (termsLink = "", field) => {
  const fullSlug = /root:[a-zA-Z-]+:\\b${field}\\b/;
  return fullSlug.test(termsLink) ? termsLink : `root:${termsLink}:${field}`;
};

export const ValuableDetailsContainer = (props: Props) => {
  const { t, loading } = useTranslationsGql({
    termsAndConditionLabel:
      "root:valuable-details-component:fields.terms_and_conditions_title",
    cashUnlockedActionLabel:
      "root:valuable-details-component:fields.use_bonus_money",
    spinsUnlockedActionLabel:
      "root:valuable-details-component:fields.use_bonus_spins",
    activateCashbackActionLabel:
      "root:valuable-details-component:fields.activate_cashback",
    playToUnlockLabel: "root:valuable-details-component:fields.play_to_unlock",
    playNowLabel: "root:valuable-details-component:fields.play_now",
    depositToUnlockLabel:
      "root:valuable-details-component:fields.deposit_to_unlock",
    depositNowLabel: "root:valuable-details-component:fields.deposit_now",
    expirationTimeLabel:
      "root:valuable-details-component:fields.expirationTimeLabel",
    termsAndConditionsTitle: getSlugOrDefault(
      props.valuableDetails.termsLink,
      "title"
    ),
    generalTermsAndConditionsTitle: "root:toc.general-wo-tcs:title",
    marketSpecificTermsAndConditionsTitle:
      "root:toc.market-specific-wo-tcs:title",
    termsAndConditionsContent: getSlugOrDefault(
      props.valuableDetails.termsLink,
      "content"
    ),
    generalTermsAndConditionsContent: "root:toc.general-wo-tcs:content",
    marketSpecificTermsAndConditionsContent:
      "root:toc.market-specific-wo-tcs:content",
    wageringStatus: "root:valuable-details-component:fields.wagering_status",
    minute_singular: "root:units:fields.minute_singular",
    minute_plural: "root:units:fields.minutes",
    hour_singular: "root:units:fields.hour_singular",
    hour_plural: "root:units:fields.hours",
    day_singular: "root:units:fields.day_singular",
    day_plural: "root:units:fields.days",
  });
  const playerId = useSelector(playerIdSelector) as string;

  return loading ? null : (
    <ValuableDetails {...props} playerId={playerId} translations={t} />
  );
};
