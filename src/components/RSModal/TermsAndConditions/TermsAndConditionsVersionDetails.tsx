import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import * as React from "react";
import type {
  VersionDateFormatter,
  VersionFormatter,
} from "./termsAndConditions.utils";

type Props = {
  onShowHistory: () => void;
  shouldAllowHistoryView: boolean;
  currentVersion: number;
  formatVersion: VersionFormatter;
  formatVersionDate: VersionDateFormatter;
  versionData: {
    changelog: string;
    version: string;
    iso_8601_published_date: string;
    pdf: {
      url: string;
      title: string;
    };
  };
  t: {
    button_download_pdf: string;
    button_version_history: string;
  };
};

export function TermsAndConditionsVersionDetails({ t, ...props }: Props) {
  return (
    <>
      <Flex className="u-padding--sm bg-grey-0" />
      <Flex direction="vertical" className="u-padding-y--lg u-padding-x--md">
        <Text tag="span" size="sm" className="u-font-weight-bold text-black">
          {props.formatVersion(props.currentVersion, props.versionData.version)}
        </Text>
        <Text tag="span" size="xs" className="text-grey-50 u-margin-top--sm">
          {props.formatVersionDate(
            props.currentVersion,
            props.versionData.iso_8601_published_date
          )}
        </Text>
      </Flex>
      <Flex justify="space-between" className="u-padding--md">
        {props.shouldAllowHistoryView ? (
          <>
            <Flex.Block>
              <ButtonPrimary
                size="sm"
                href={props.versionData.pdf.url}
                className="u-width--full"
                download={props.versionData.pdf.title}
              >
                {t.button_download_pdf}
              </ButtonPrimary>
            </Flex.Block>
            <Flex.Block>
              <ButtonSecondary
                size="sm"
                data-test-id="toggle-history-view-btn"
                onClick={props.onShowHistory}
                className="u-width--full"
              >
                {t.button_version_history}
              </ButtonSecondary>
            </Flex.Block>
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
      <Flex className="u-padding--sm bg-grey-0" />
    </>
  );
}
