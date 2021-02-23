// @flow
import React from "react";
import { CuratedCardHeaderWithSubtitle } from "./CuratedCardHeaderWithSubtitle";
import { CuratedCardHeaderSimple } from "./CuratedCardHeaderSimple";

export type CuratedCardHeaderProps = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  header: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  subtitle: ?string,
  isGame: boolean,
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
