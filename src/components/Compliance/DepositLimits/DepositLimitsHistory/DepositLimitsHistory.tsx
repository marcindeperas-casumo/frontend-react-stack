import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon, CheckIcon } from "@casumo/cmp-icons";
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import cx from "classnames";
import { formatCurrency } from "Utils";
import type { DepositLimitsHistoryType } from "Models/playOkay/depositLimits";
import { TCurrencyCode } from "Src/constants";
import { SectionHeader } from "../DepositLimitsOverview/SectionHeader";
import "./depositLimitsHistory.scss";

type Props = {
  t: {
    daily_adjusted: string;
    weekly_adjusted: string;
    monthly_adjusted: string;
    history: string;
    adjustment_status_success: string;
    title_removed: string;
    title_decreased: string;
    title_increased: string;
    title_created: string;
    title_set_on_registration: string;
    all_limits_removed: string;
  };
  locale: string;
  currency: TCurrencyCode;
  getLimitsHistory: () => void;
  fetchTranslations: () => void;
  history: Array<DepositLimitsHistoryType>;
};

type TranslationKeys = keyof Props["t"];

const getTranslationKeyForHistoryEntry: (
  historyItem: DepositLimitsHistoryType
) => TranslationKeys = R.cond([
  [R.propEq("setOnRegistration", true), R.always("title_set_on_registration")],
  [R.propEq("type", "increase"), R.always("title_increased")],
  [R.propEq("type", "decrease"), R.always("title_decreased")],
  [R.propEq("type", "removed"), R.always("title_removed")],
  [R.propEq("type", "created"), R.always("title_created")],
]);

export function DepositLimitsHistory({ t, ...props }: Props) {
  React.useEffect(() => {
    props.getLimitsHistory();
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
          "bg-white",
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
              <Flex className="text-green-30 u-margin-y" align="center">
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
                <Text tag="span" size="sm" className="text-grey-50">
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
                    "bg-grey-0",
                    "u-margin-left u-margin-right--lg",
                    i === props.history.length - 1 &&
                      "c-deposit-limits-history__left-bar--small"
                  )}
                />
                <Flex
                  direction="vertical"
                  spacing="none"
                  className={cx(
                    "bg-grey-0",
                    "t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-r-top-right--md",
                    " u-padding--md o-flex--1"
                  )}
                >
                  <Text tag="span" className="text-grey-50">
                    {t[getTranslationKeyForHistoryEntry(historyItem)]}
                  </Text>
                  {historyItem.type === "removed" ? (
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
                        key={x.limitKind}
                        className="u-padding-top"
                      >
                        {t[`${x.limitKind}_adjusted`]}{" "}
                        <Text tag="span" className="u-font-weight-black">
                          {x.before ? (
                            <>
                              {formatCurrency({
                                locale: props.locale,
                                currency: props.currency,
                                value: x.before,
                              })}
                              <ArrowRightIcon
                                size="sm"
                                className="text-grey-50 c-deposit-limits-history__change-icon"
                              />
                            </>
                          ) : null}
                          {formatCurrency({
                            locale: props.locale,
                            currency: props.currency,
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
