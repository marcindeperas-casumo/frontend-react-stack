// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { Mobile, Desktop } from "Components/ResponsiveLayout";
import { stringToHTML } from "Utils";

type HeaderProps = {
  header: string,
};

type HeaderSubtitleProps = {
  subtitle: string,
};

export const CuratedCardHeader = ({ header }: HeaderProps) => (
  <>
    <Mobile>
      <Text
        data-test="curated-card-header"
        className="u-margin-bottom--none u-line-height--1 u-font-weight-bold t-color-white"
        size="2xlg"
        dangerouslySetInnerHTML={stringToHTML(header)}
      />
    </Mobile>
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

export const CuratedCardHeaderWithSubtitle = ({
  header,
  subtitle,
}: HeaderProps & HeaderSubtitleProps) => (
  <div className="o-wrapper">
    <Text
      data-test="curated-card-header-subtitle"
      className="u-font-weight-bold t-color-white u-margin-bottom u-text-transform-uppercase u-opacity-75"
      size="2xs"
    >
      {subtitle}
    </Text>
    <CuratedCardHeader header={header} />
  </div>
);
