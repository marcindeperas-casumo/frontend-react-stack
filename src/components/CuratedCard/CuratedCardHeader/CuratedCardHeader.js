// @flow
import React from "react";
import { CuratedCardHeaderWithSubtitle } from "./CuratedCardHeaderWithSubtitle";
import { CuratedCardHeaderSimple } from "./CuratedCardHeaderSimple";

export type CuratedCardHeaderProps = {
  header: string,
  subtitle: string,
  isGame: boolean,
};

export const CuratedCardHeader = ({
  isGame,
  header,
  subtitle,
}: CuratedCardHeaderProps) =>
  isGame ? (
    <CuratedCardHeaderSimple header={header} />
  ) : (
    <CuratedCardHeaderWithSubtitle header={header} subtitle={subtitle} />
  );
