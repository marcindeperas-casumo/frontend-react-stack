// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import type {
  VersionDateFormatter,
  VersionFormatter,
} from "./termsAndConditions.utils";

type Props = {
  onShowHistory: () => void,
  shouldAllowHistoryView: boolean,
  currentVersion: number,
  formatVersion: VersionFormatter,
  formatVersionDate: VersionDateFormatter,
  versionData: {
    changelog: string,
    version: string,
    iso_8601_published_date: string,
    pdf: {
      url: string,
      title: string,
    },
  },
  t: {
    button_download_pdf: string,
    button_version_history: string,
  },
};

export function TermsAndConditionsVersionDetails({ t, ...props }: Props) {
  return (
    <>
      <Flex className="u-padding--sm t-background-grey-0" />
      <Flex direction="vertical" className="u-padding-y--lg u-padding-x--md">
        <Text tag="span" size="sm" className="u-font-weight-bold t-color-black">
          {props.formatVersion(props.currentVersion, props.versionData.version)}
        </Text>
        <Text tag="span" size="xs" className="t-color-grey-50 u-margin-top--sm">
          {props.formatVersionDate(
            props.currentVersion,
            props.versionData.iso_8601_published_date
          )}
        </Text>
      </Flex>
      <Flex justify="space-between" className="u-padding--md">
        {props.shouldAllowHistoryView ? (
          <>
            <ButtonPrimary
              href={props.versionData.pdf.url}
              className="o-flex--1"
              download={props.versionData.pdf.title}
            >
              {t.button_download_pdf}
            </ButtonPrimary>
            <div className="u-padding" />
            <ButtonSecondary
              data-test-id="toggle-history-view-btn"
              onClick={props.onShowHistory}
              className="o-flex--1"
            >
              {t.button_version_history}
            </ButtonSecondary>
          </>
        ) : (
          <ButtonSecondary
            href={props.versionData.pdf.url}
            className="o-flex--1"
            download={props.versionData.pdf.title}
          >
            {t.button_download_pdf}
          </ButtonSecondary>
        )}
      </Flex>
      <Flex className="u-padding--sm t-background-grey-0" />
    </>
  );
}
