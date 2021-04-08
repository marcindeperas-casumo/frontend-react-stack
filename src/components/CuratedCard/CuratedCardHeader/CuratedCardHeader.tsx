import React from "react";
import { CuratedCardHeaderWithSubtitle } from "./CuratedCardHeaderWithSubtitle";
import { CuratedCardHeaderSimple } from "./CuratedCardHeaderSimple";

export type CuratedCardHeaderProps = {
  header: string | undefined;
  subtitle: string | undefined;
  launchButtonText: string | undefined;
  isGame: boolean;
  isSports: boolean;
  isWelcomeOffer: boolean;
};

export const CuratedCardHeader = ({
  isGame,
  isSports,
  header,
  subtitle,
  isWelcomeOffer,
  launchButtonText
}: CuratedCardHeaderProps) => {
  if ((isGame || isSports) && header) {
    return <CuratedCardHeaderSimple
      header={header}
      launchButtonText={launchButtonText}
      isWelcomeOffer={isWelcomeOffer}
    />;
  }

  if (header || subtitle) {
    return (
      <CuratedCardHeaderWithSubtitle
        header={header}
        subtitle={subtitle}
        launchButtonText={launchButtonText}
        isWelcomeOffer={isWelcomeOffer}
      />
    );
  }

  return null;
};
