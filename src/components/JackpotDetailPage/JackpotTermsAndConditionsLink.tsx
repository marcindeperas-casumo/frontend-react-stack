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
    console.log("t&c not wired up", jackpotSlug);
    e.stopPropagation();
    e.preventDefault();

    return true;
    //launch your modal here
  };
  return <a onClick={showTermsAndConditions}>{unescape(text)}</a>;
};
