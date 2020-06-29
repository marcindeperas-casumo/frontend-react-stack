import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { ValuableDetails } from "./ValuableDetails";

export const ValuableDetailsContainer = props => {
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
    termsAndConditionsContent: "root:uk-welcome-bonus-terms:content",
    wageringStatus: "root:valuable-details-component:fields.wagering_status",
    minute_singular: "root:units:fields.minute_singular",
    minute_plural: "root:units:fields.minutes",
    hour_singular: "root:units:fields.hour_singular",
    hour_plural: "root:units:fields.hours",
    day_singular: "root:units:fields.day_singular",
    day_plural: "root:units:fields.days",
  });

  return loading ? null : <ValuableDetails {...props} translations={t} />;
};
