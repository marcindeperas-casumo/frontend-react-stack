// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { stringToHTML } from "Utils";

export type CuratedCardHeaderSimpleProps = {
  header: string,
};

export const CuratedCardHeaderSimple = ({
  header,
}: CuratedCardHeaderSimpleProps) => (
  <>
    <MobileAndTablet>
      <Text
        data-test="curated-card-header"
        className="u-margin-bottom--none u-line-height--1 u-font-weight-bold t-color-white"
        size="2xlg"
        dangerouslySetInnerHTML={stringToHTML(header)}
      />
    </MobileAndTablet>
    <Desktop>
      <div className="o-wrapper">
        <Text
          data-test="curated-card-header"
          className="u-margin-bottom--none u-line-height--1 u-font-weight-bold t-color-white"
          size="3xlg"
          dangerouslySetInnerHTML={stringToHTML(header)}
        />
      </div>
    </Desktop>
  </>
);
