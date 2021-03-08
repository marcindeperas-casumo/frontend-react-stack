import React from "react";
import { CuratedCardHeaderWithSubtitle } from "./CuratedCardHeaderWithSubtitle";
import { CuratedCardHeaderSimple } from "./CuratedCardHeaderSimple";

export type CuratedCardHeaderProps = {
  header: string | undefined;
  subtitle: string | undefined;
  isGame: boolean;
};

export const CuratedCardHeader = ({
  isGame,
  header,
  subtitle,
}: CuratedCardHeaderProps) => {
  if (isGame && header) {
    return <CuratedCardHeaderSimple header={header} />;
  }

  if (header && subtitle) {
    return (
      <CuratedCardHeaderWithSubtitle header={header} subtitle={subtitle} />
    );
  }

  return null;
};
