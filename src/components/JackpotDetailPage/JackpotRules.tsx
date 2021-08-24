import React from "react";
import { interpolateWithJSX } from "Utils/utils";
import { JackpotTermsAndConditionsLink } from "./JackpotTermsAndConditionsLink";

type TProps = {
  text: string;
  tncLabel: string;
  jackpotSlug: string;
};

export const JackpotRules = ({ text, tncLabel, jackpotSlug }: TProps) => {
  const content = interpolateWithJSX(
    {
      tcLink: (
        <JackpotTermsAndConditionsLink
          jackpotSlug={jackpotSlug}
          text={tncLabel}
        />
      ),
    },
    text
  );

  return (
    <div className="u-padding t-border t-border-r t-border-grey-5">
      {content}
    </div>
  );
};
