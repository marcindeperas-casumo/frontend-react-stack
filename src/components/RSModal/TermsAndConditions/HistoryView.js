// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  t: {
    button_view_version: string,
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
  setVersion: number => void,
  formatVersion: (number, string) => string,
  formatVersionDate: (number, string) => string,
};

export function HistoryView({ t, ...props }: Props) {
  return (
    <>
      {R.pipe(
        R.toPairs,
        R.map(([v, data]) => {
          const version = parseInt(v);

          return (
            <Flex
              key={version}
              justify="space-between"
              align="center"
              className="t-border-bottom u-padding--md"
              onClick={() => props.setVersion(version)}
            >
              <Flex direction="vertical">
                <Text
                  tag="span"
                  size="sm"
                  className="u-font-weight-bold u-margin-bottom"
                >
                  {props.formatVersion(version, data.version)}
                </Text>
                <Text tag="span" size="sm">
                  {props.formatVersionDate(
                    version,
                    data.iso_8601_published_date
                  )}
                </Text>
              </Flex>
              <Text
                tag="span"
                size="sm"
                className="u-font-weight-bold t-color-turquoise u-cursor-pointer"
              >
                {t.button_view_version}
              </Text>
            </Flex>
          );
        })
      )(t.versions)}
    </>
  );
}
