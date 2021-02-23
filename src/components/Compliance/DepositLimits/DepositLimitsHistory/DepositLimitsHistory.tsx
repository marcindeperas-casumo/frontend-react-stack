// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon, CheckIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import type {
  DepositLimitsHistoryType,
  LimitChangeType,
} from "Models/playOkay/depositLimits";
import { SectionHeader } from "../DepositLimitsOverview/SectionHeader";
import "./depositLimitsHistory.scss";

type Props = {
  t: {
    daily_adjusted: string,
    weekly_adjusted: string,
    monthly_adjusted: string,
    history: string,

    adjustment_status_success: string,
    title_removed: string,
    title_decreased: string,
    title_increased: string,
    title_set_on_registration: string,
    all_limits_removed: string,
  },
  locale: string,
  currency: string,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  getLimitsHistory: void => void,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  fetchTranslations: void => void,
  history: DepositLimitsHistoryType,
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Keys'.
type TranslationKeys = $Keys<$PropertyType<Props, "t">>;
// @ts-expect-error ts-migrate(2693) FIXME: 'TranslationKeys' only refers to a type, but is be... Remove this comment to see the full error message
const alwaysWithTranslation: TranslationKeys => TranslationKeys = R.always;
// @ts-expect-error ts-migrate(2693) FIXME: 'TranslationKeys' only refers to a type, but is be... Remove this comment to see the full error message
const getTranslationKeyForHistoryEntry: any => TranslationKeys = R.cond([
  [
    R.propEq("setOnRegistration", true),
    alwaysWithTranslation("title_set_on_registration"),
  ],
  [
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.propEq("type", ("increase": LimitChangeType)),
    alwaysWithTranslation("title_increased"),
  ],
  // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
  [
    // @ts-expect-error ts-migrate(2693) FIXME: 'LimitChangeType' only refers to a type, but is be... Remove this comment to see the full error message
    R.propEq("type", ("decrease": LimitChangeType)),
    alwaysWithTranslation("title_decreased"),
  ],
  [
    // @ts-expect-error ts-migrate(2693) FIXME: 'LimitChangeType' only refers to a type, but is be... Remove this comment to see the full error message
    R.propEq("type", ("removed": LimitChangeType)),
    alwaysWithTranslation("title_removed"),
  ],
]);

export function DepositLimitsHistory({ t, ...props }: Props) {
  React.useEffect(() => {
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    props.getLimitsHistory();
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.history || !t) {
    return null;
  }

  return (
    <>
      <SectionHeader>{t.history}</SectionHeader>
      <Flex
        direction="vertical"
        align="stretch"
        spacing="none"
        className={cx(
          "t-background-white",
          "t-border-r--none t-border-r--md@tablet t-border-r--md@desktop",
          "u-padding--md u-height--full u-margin-top u-overflow--hidden"
        )}
      >
        <Flex direction="vertical" align="center">
          {props.history.map((historyItem, i) => (
            <Flex
              key={historyItem.id}
              direction="vertical"
              spacing="none"
              align="stretch"
              className="c-deposit-limits-history__container u-width--full u-margin-bottom--md"
            >
              <Flex className="t-color-green-30 u-margin-y" align="center">
                <CheckIcon
                  size="sm"
                  className="t-border--md t-border-current t-border-r--circle u-margin-right--md"
                />
                <Text
                  tag="span"
                  size="sm"
                  className="u-font-weight-black u-margin-right--sm"
                >
                  {t.adjustment_status_success}
                </Text>
                <Text tag="span" size="sm" className="t-color-grey-50">
                  {DateTime.fromISO(historyItem.timestamp).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                </Text>
              </Flex>

              <Flex>
                <Flex />
                {/* ^-- dumb workaround for margin: 0 !important on horizontal flex} */}
                <Flex
                  className={cx(
                    "c-deposit-limits-history__left-bar",
                    "t-background-grey-0",
                    "u-margin-left u-margin-right--lg",
                    i === props.history.length - 1 &&
                      "c-deposit-limits-history__left-bar--small"
                  )}
                />
                <Flex
                  direction="vertical"
                  spacing="none"
                  className={cx(
                    "t-background-grey-0",
                    "t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-r-top-right--md",
                    " u-padding--md o-flex--1"
                  )}
                >
                  <Text tag="span" className="t-color-grey-50">
                    {t[getTranslationKeyForHistoryEntry(historyItem)]}
                  </Text>
                  {historyItem.type === ("removed": LimitChangeType) ? (
                    <Text
                      tag="span"
                      className="u-padding-top u-font-weight-black"
                    >
                      {t.all_limits_removed}
                    </Text>
                  ) : (
                    historyItem.changes.map(x => (
                      <Text
                        tag="span"
                        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
                        key={x.limitKind}
                        className="u-padding-top"
                      >
                        {/* @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'. */}
                        {t[`${x.limitKind}_adjusted`]}{" "}
                        <Text tag="span" className="u-font-weight-black">
                          {/* @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'. */}
                          {x.before ? (
                            <>
                              {formatCurrency({
                                locale: props.locale,
                                currency: props.currency,
                                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
                                value: x.before,
                              })}
                              <ArrowRightIcon
                                size="sm"
                                className="t-color-grey-50 c-deposit-limits-history__change-icon"
                              />
                            </>
                          ) : null}
                          {formatCurrency({
                            locale: props.locale,
                            currency: props.currency,
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
                            value: x.after,
                          })}
                        </Text>
                      </Text>
                    ))
                  )}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
