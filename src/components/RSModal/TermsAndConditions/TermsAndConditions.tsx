import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { useTranslations, useLocale } from "Utils/hooks";
import { useRelevantVersionsSlugs, useTACAcknowledgements } from "Models/tac";
import {
  ModalHeader,
  ModalLoadingState,
  ModalAcknowledgment,
} from "Components/RSModal";
import type { ModalContentComponent } from "Components/RSModal";
import { HistoryView } from "./HistoryView";
import { ArchivedVersionHeader } from "./ArchivedVersionHeader";
import { TermsAndConditionsVersionDetails } from "./TermsAndConditionsVersionDetails";
import { TermsAndConditionsContent } from "./TermsAndConditionsContent";
import { Changelog } from "./Changelog";
import {
  createVersionDateFormatter,
  createVersionFormatter,
  useVersion,
} from "./termsAndConditions.utils";
import "./termsAndConditions.scss";

type Props = ModalContentComponent<{
  /** info that given version is outdated, text between "<#>" and "</#>" will be link to current version */
  note_version_old: string;
  /** user friendly presentation of current version number. Have to contain {version} that will be replaced */
  version_label_current: string;
  /** user friendly presentation of version number that was accepted during registration. Have to contain {version} that will be replaced */
  version_label_original: string;
  /** user friendly presentation of version number. Have to contain {version} that will be replaced */
  version_label: string;
  /** cta text to view specific version */
  button_view_version: string;
  /** user friendly presentation of date. Have to contain {date} that will be replaced */
  date_published: string;
  /** user friendly presentation of date when user registered. Have to contain {date} that will be replaced */
  date_agreed: string;
  /** user friendly presentation of date when user accepted given version. Have to contain {date} that will be replaced */
  date_changes_accepted: string;
  /** text that will be shown on download pdf button */
  button_download_pdf: string;
  /** text that will be shown on show history button */
  button_version_history: string;
  /** title before table of contents */
  table_of_contents_title: string;
  /** text that will be shown before changelog */
  changelog_title: string;
  /** title of modal component */
  terms_and_conditions_modal_title: string;
}>;

type TACVersionCMSData = {
  iso_8601_published_date: string;
  changelog: string;
  version: string;
  pdf: {
    url: string;
    title: string;
  };
};

export function TermsAndConditions({ t, ...props }: Props) {
  const locale = useLocale();
  const acks = useTACAcknowledgements();
  const relevantTACVersionsSlugs = useRelevantVersionsSlugs();
  const [version, setVersion] = useVersion(acks.last?.version);
  const visibleVersionData = useTranslations<TACVersionCMSData>(
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'Dispatch<SetStateAction<number>>' cannot be ... Remove this comment to see the full error message
    relevantTACVersionsSlugs[version]
  );

  const [historyView, setHistoryView] = React.useState(false);
  if (!version || !t) {
    return <ModalLoadingState />;
  }

  const formatVersionDate = createVersionDateFormatter({
    acks,
    t,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ acks: { first: Acknowledgement... Remove this comment to see the full error message
    locale,
  });
  const formatVersion = createVersionFormatter({ acks, t });

  const headerProps = !props.config.mustAccept
    ? {
        showCloseButton: true,
        closeAction: props.closeModal,
      }
    : {};

  if (historyView) {
    return (
      <>
        <ModalHeader
          title={t.button_version_history}
          {...headerProps}
          showBackButton
          backAction={() => setHistoryView(false)}
        />
        <HistoryView
          viewButtonText={t.button_view_version}
          versions={relevantTACVersionsSlugs}
          formatVersionDate={formatVersionDate}
          formatVersion={formatVersion}
          setVersion={(v: number) => {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            setVersion(v);
            setHistoryView(false);
          }}
        />
      </>
    );
  }

  const isLatestVersion = version === acks.last.version;
  const hasNewerVersions = acks.last.version !== acks.first.version;
  if (!visibleVersionData) {
    return <ModalLoadingState />;
  }

  return (
    <>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ showCloseButton: boolean; closeAction: (re... Remove this comment to see the full error message */}
      <ModalHeader
        title={t.terms_and_conditions_modal_title}
        {...headerProps}
      />
      {!isLatestVersion && (
        <ArchivedVersionHeader
          onClick={() => {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            setVersion(acks.last.version);
            setHistoryView(false);
          }}
          title={t.note_version_old}
        />
      )}
      <Flex className="u-overflow-x--hidden" direction="vertical">
        <Flex.Item>
          <TermsAndConditionsVersionDetails
            onShowHistory={() => setHistoryView(true)}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number | Dispatch<SetStateAction<number>>' i... Remove this comment to see the full error message
            currentVersion={version}
            shouldAllowHistoryView={
              hasNewerVersions && !props.config.mustAccept
            }
            formatVersionDate={formatVersionDate}
            formatVersion={formatVersion}
            versionData={visibleVersionData}
            t={{
              button_download_pdf: t.button_download_pdf,
              button_version_history: t.button_version_history,
            }}
          />
        </Flex.Item>

        {isLatestVersion && hasNewerVersions && visibleVersionData.changelog && (
          <Flex.Item>
            <Changelog
              t={{
                date_changes_accepted: t.date_changes_accepted,
                changelog_title: t.changelog_title,
              }}
              ackTimestamp={acks.last.timestamp}
              changelog={visibleVersionData.changelog}
            />
          </Flex.Item>
        )}
        <Flex.Item>
          <Text
            tag="span"
            size="sm"
            className="u-font-weight-bold u-padding-x--md u-padding-y--lg"
          >
            {t.table_of_contents_title}
          </Text>
        </Flex.Item>
        <Flex.Item>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number | Dispatch<SetStateAction<number>>' i... Remove this comment to see the full error message */}
          <TermsAndConditionsContent version={version} />
        </Flex.Item>
      </Flex>
      {props.config.mustAccept && (
        <Flex.Item>
          <ModalAcknowledgment
            title="Accept General terms"
            onPress={props.acceptModal}
          />
        </Flex.Item>
      )}
    </>
  );
}
