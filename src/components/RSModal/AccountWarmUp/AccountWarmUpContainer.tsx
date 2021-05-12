import * as React from "react";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import type { TPlayerWarmUpDetailsResponse } from "Models/accountWarmUp";
import { CMS_SLUG } from "../AccountWarmUp";
import type { TAccountWarmUpPage } from "../AccountWarmUp";
import { AccountWarmUp } from "./AccountWarmUp";

type TAccountWarmUpProps = {
  acceptModal: () => void;
  closeModal: () => void;
  config: {
    input?: A.ReelRaceCard_ReelRaceFragment &
      Partial<TPlayerWarmUpDetailsResponse>;
  };
};

export function AccountWarmUpContainer({
  config,
  ...rest
}: TAccountWarmUpProps) {
  const content = useTranslations<TAccountWarmUpPage>(CMS_SLUG);

  if (!content) {
    return null;
  }

  return <AccountWarmUp config={{ ...config, content }} {...rest} />;
}
