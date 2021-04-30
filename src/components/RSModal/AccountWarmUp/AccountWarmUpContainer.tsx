import * as React from "react";
import { useSelector } from "react-redux";
import * as A from "Types/apollo";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { useJurisdiction, useTranslations } from "Utils/hooks";
import { CMS_SLUG } from "../AccountWarmUp";
import type { TAccountWarmUpPage } from "../AccountWarmUp";
import { AccountWarmUp } from "./AccountWarmUp";

type TAccountWarmUpProps = {
  acceptModal: () => void;
  closeModal: () => void;
  config: {
    input?: A.ReelRaceCard_ReelRaceFragment;
  };
};

export function AccountWarmUpContainer({
  config,
  ...rest
}: TAccountWarmUpProps) {
  const { isDGOJ } = useJurisdiction();
  const isInWarmUpPhase = useSelector(isWarmUpPhaseSelector);
  const content = useTranslations<TAccountWarmUpPage>(CMS_SLUG);

  if (!isDGOJ || !isInWarmUpPhase || !content) {
    return null;
  }

  return <AccountWarmUp config={{ ...config, content }} {...rest} />;
}
