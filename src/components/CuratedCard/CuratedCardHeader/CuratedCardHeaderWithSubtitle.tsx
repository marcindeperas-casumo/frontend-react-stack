// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { CuratedCardHeaderSimple } from "./CuratedCardHeaderSimple";
import type { CuratedCardHeaderSimpleProps } from "./CuratedCardHeaderSimple";

type CuratedCardHeaderWithSubtitleProps = CuratedCardHeaderSimpleProps & {
  subtitle: string,
};

export const CuratedCardHeaderWithSubtitle = ({
  header,
  subtitle,
}: CuratedCardHeaderWithSubtitleProps) => (
  <div className="o-wrapper">
    <Text
      data-test="curated-card-header-subtitle"
      className="u-font-weight-bold t-color-white u-margin-bottom u-text-transform-uppercase u-opacity-75"
      size="2xs"
    >
      {subtitle}
    </Text>
    <CuratedCardHeaderSimple header={header} />
  </div>
);
