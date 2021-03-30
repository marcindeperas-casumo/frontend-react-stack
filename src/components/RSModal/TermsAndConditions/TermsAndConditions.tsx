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
import type { TTranslations } from "./TermsAndConditions.types";
import {
  createVersionDateFormatter,
  createVersionFormatter,
  useVersion,
} from "./termsAndConditions.utils";
import "./termsAndConditions.scss";

type Props = ModalContentComponent<TTranslations>;

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
    relevantTACVersionsSlugs[version]
  );

  const [historyView, setHistoryView] = React.useState(false);
  if (!version || !t) {
    return <ModalLoadingState />;
  }

  const formatVersionDate = createVersionDateFormatter({
    acks,
    t,
    locale,
  });
  const formatVersion = createVersionFormatter({ acks, t });

  const mustAcceptTerms = props.config?.mustAccept;

  const headerProps = !mustAcceptTerms
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
      <ModalHeader
        title={t.terms_and_conditions_modal_title}
        {...headerProps}
      />
      {!isLatestVersion && (
        <ArchivedVersionHeader
          onClick={() => {
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
            currentVersion={version}
            shouldAllowHistoryView={hasNewerVersions && !mustAcceptTerms}
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
          <TermsAndConditionsContent version={version} />
        </Flex.Item>
      </Flex>
      {mustAcceptTerms && (
        <Flex.Item>
          <ModalAcknowledgment
            title={t.button_accept_terms}
            onPress={props.acceptModal}
          />
        </Flex.Item>
      )}
    </>
  );
}
