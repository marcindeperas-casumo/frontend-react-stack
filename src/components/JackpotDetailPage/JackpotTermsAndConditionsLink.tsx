import React, { MouseEvent } from "react";
import { unescape } from "lodash";

type TProps = {
  text: string;
  jackpotSlug: string;
};

export const JackpotTermsAndConditionsLink = ({
  text,
  jackpotSlug,
}: TProps) => {
  const showTermsAndConditions = (e: MouseEvent) => {
    //launch your modal here
  };
  return <a onClick={showTermsAndConditions}>{unescape(text)}</a>;
};
