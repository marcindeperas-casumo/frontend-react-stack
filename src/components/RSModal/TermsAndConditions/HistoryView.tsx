import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Skeleton from "@casumo/cmp-skeleton";
import * as R from "ramda";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import type {
  VersionDateFormatter,
  VersionFormatter,
} from "./termsAndConditions.utils";

type BaseProps = {
  viewButtonText: string;
  setVersion: (n: number) => void;
  formatVersion: VersionFormatter;
  formatVersionDate: VersionDateFormatter;
};

type PropsHistoryView = BaseProps & {
  versions: { [n: number]: string };
};

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
const versionsByNewestFirst = R.descend(R.prop(0));
export function HistoryView({ versions, ...props }: PropsHistoryView) {
  return (
    <>
      <Flex className="u-padding--sm t-background-grey-0" />
      {R.pipe(
        R.toPairs,
        R.sort(versionsByNewestFirst),
        R.map(([v, slug]) => (
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
          <HistoryRow key={v} slug={slug} version={parseInt(v)} {...props} />
        ))
      )(versions)}
    </>
  );
}

type PropsHistoryRow = BaseProps & {
  slug: string;
  version: number;
};

const loaderVersion = (
  <Skeleton width="120" height={10}>
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
  </Skeleton>
);
const loaderDate = (
  <Skeleton width="220" height={10}>
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
  </Skeleton>
);
function HistoryRow(props: PropsHistoryRow) {
  const versionData = useTranslations(props.slug);

  return (
    <Flex
      justify="space-between"
      align="center"
      className="t-border-bottom t-border-grey-5 u-padding--md"
      onClick={() => props.setVersion(props.version)}
    >
      <Flex direction="vertical">
        <Text
          tag="span"
          size="sm"
          className="u-font-weight-bold u-margin-bottom"
        >
          {versionData
            ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type 'unknown... Remove this comment to see the full error message
              props.formatVersion(props.version, versionData.version)
            : loaderVersion}
        </Text>
        <Text tag="span" size="sm">
          {versionData
            ? props.formatVersionDate(
                props.version,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'iso_8601_published_date' does not exist ... Remove this comment to see the full error message
                versionData.iso_8601_published_date
              )
            : loaderDate}
        </Text>
      </Flex>
      <Text
        tag="span"
        size="sm"
        className="u-font-weight-bold t-color-teal-50 u-cursor--pointer"
      >
        {props.viewButtonText}
      </Text>
    </Flex>
  );
}
