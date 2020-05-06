// @flow
import * as React from "react";
import { navigateById } from "Services/NavigationService";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { DepositLimitsTopNavigation } from "./DepositLimitsTopNavigation";

export function DepositLimitsTopNavigationContainer() {
  const { t } = useTranslationsGql({
    yourStuffLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_your_stuff",
    detailsLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_details",
    playOkayLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_playokay",
  });

  return <DepositLimitsTopNavigation t={t} action={navigateById} />;
}
