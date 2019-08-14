// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon, DownloadIcon } from "@casumo/cmp-icons";
import { Changelog } from "./Changelog";
import { HistoryView } from "./HistoryView";
import { ArchivedVersionHeader } from "./ArchivedVersionHeader";
import { TermsAndConditionsContentContainer } from "./TermsAndConditionsContentContainer";
import {
  createVersionDateFormatter,
  createVersionFormatter,
  useVersion,
} from "./termsAndConditions.utils";
import "./termsAndConditions.scss";

type Props = {
  t: {
    /** info that given version is outdated, text between "<#>" and "</#>" will be link to current version */
    note_version_old: string,
    /** user friendly presentation of current version number. Have to contain {version} that will be replaced */
    version_label_current: string,
    /** user friendly presentation of version number that was accepted during registration. Have to contain {version} that will be replaced */
    version_label_original: string,
    /** user friendly presentation of version number. Have to contain {version} that will be replaced */
    version_label: string,
    /** cta text to view specific version */
    button_view_version: string,
    /** user friendly presentation of date. Have to contain {date} that will be replaced */
    date_published: string,
    /** user friendly presentation of date when user registered. Have to contain {date} that will be replaced */
    date_agreed: string,
    /** user friendly presentation of date when user accepted given version. Have to contain {date} that will be replaced */
    date_changes_accepted: string,
    /** text that will be shown on download pdf button */
    button_download_pdf: string,
    /** text that will be shown on show history button */
    button_version_history: string,
    /** title before table of contents */
    table_of_contents_title: string,
    /** text that will be shown before changelog */
    changelog_title: string,
    versions: {
      [number]: {
        changelog: string,
        version: string,
        iso_8601_published_date: string,
        pdf: {
          url: string,
        },
      },
    },
  },
  locale: string,
  fetchTACAcknowledgements: () => void,
  fetchTranslations: () => void,
  acks: {
    /** first T&C acknowledgement during registration */
    first: {
      version: number,
      timestamp: number,
    },
    /** acknowledgement of last version */
    last: {
      version: number,
      timestamp: number,
    },
  },
};

export function TermsAndConditions({ t, acks, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTACAcknowledgements();
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [version, setVersion] = useVersion(acks.last?.version);
  const [historyView, setHistoryView] = React.useState(false);
  if (!version || !t) {
    return null;
  }

  const formatVersionDate = createVersionDateFormatter({
    acks,
    t,
    locale: props.locale,
  });
  const formatVersion = createVersionFormatter({ acks, t });

  if (historyView) {
    return (
      <HistoryView
        t={t}
        formatVersionDate={formatVersionDate}
        formatVersion={formatVersion}
        setVersion={(v: number) => {
          setVersion(v);
          setHistoryView(false);
        }}
      />
    );
  }

  const isLatestVersion = version === acks.last.version;
  const hasNewerVersions = acks.last.version !== acks.first.version;
  const visibleTAC = t.versions[version];
  if (!visibleTAC) {
    return null;
  }

  return (
    <>
      {!isLatestVersion && (
        <ArchivedVersionHeader
          onClick={() => {
            setVersion(acks.last.version);
            setHistoryView(false);
          }}
          t={{ note_version_old: t.note_version_old }}
        />
      )}
      <Flex className="c-tac__container" direction="vertical">
        <Flex
          direction="vertical"
          className="c-tac__header u-padding--md u-margin-bottom--lg t-color-grey-light-2"
        >
          <Text
            tag="span"
            size="xlg"
            className="u-font-weight-black t-color-plum-dark-1"
          >
            {formatVersion(version, visibleTAC.version)}
          </Text>
          <Text size="sm" className="t-color-grey-dark-1 u-margin-top">
            {formatVersionDate(version, visibleTAC.iso_8601_published_date)}
          </Text>
          <Flex
            justify="space-between"
            className="t-color-turquoise u-cursor-pointer u-margin-top--lg"
          >
            <a href={visibleTAC.pdf.url} className="t-color-turquoise">
              <Flex align="center">
                <DownloadIcon />
                <Text tag="span" size="sm" className="u-font-weight-bold">
                  {t.button_download_pdf}
                </Text>
              </Flex>
            </a>
            {hasNewerVersions && (
              <Flex
                align="center"
                className="u-cursor-pointer"
                data-test-id="toggle-history-view-btn"
                onClick={() => setHistoryView(true)}
              >
                <Text tag="span" size="sm" className="u-font-weight-bold">
                  {t.button_version_history}
                </Text>
                <ArrowRightIcon />
              </Flex>
            )}
          </Flex>
        </Flex>

        {isLatestVersion && hasNewerVersions && (
          <Changelog
            locale={props.locale}
            t={{
              date_changes_accepted: t.date_changes_accepted,
              changelog_title: t.changelog_title,
            }}
            ackTimestamp={acks.last.timestamp}
            changelog={visibleTAC.changelog}
          />
        )}

        <Text
          size="lg"
          className="u-font-weight-black u-padding-x--md u-padding-y"
        >
          {t.table_of_contents_title}
        </Text>
        <TermsAndConditionsContentContainer version={version} />
      </Flex>
    </>
  );
}
