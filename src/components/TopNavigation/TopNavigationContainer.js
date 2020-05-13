// @flow
import * as React from "react";
import { navigateById } from "Services/NavigationService";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { TopNavigation } from "./TopNavigation";

const playOkayDGOJDepositLimitFields =
  "root:shared.playokay.dgoj.deposit-limits:fields";

export function TopNavigationContainer() {
  const { t } = useTranslationsGql({
    yourStuffLabel: `${playOkayDGOJDepositLimitFields}.top_navi_your_stuff`,
    detailsLabel: `${playOkayDGOJDepositLimitFields}.top_navi_details`,
    playOkayLabel: `${playOkayDGOJDepositLimitFields}.top_navi_playokay`,
  });

  return <TopNavigation t={t} action={navigateById} />;
}
