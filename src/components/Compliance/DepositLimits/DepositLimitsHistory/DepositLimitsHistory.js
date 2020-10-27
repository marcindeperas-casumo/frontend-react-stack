// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon, CheckIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import type {
  DepositLimitsHistoryType,
  LimitChangeType,
} from "Models/playOkay/depositLimits";
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
  getLimitsHistory: void => void,
  fetchTranslations: void => void,
  history: DepositLimitsHistoryType,
};

type TranslationKeys = $Keys<$PropertyType<Props, "t">>;
const alwaysWithTranslation: TranslationKeys => TranslationKeys = R.always;
const getTranslationKeyForHistoryEntry: any => TranslationKeys = R.cond([
  [
    R.propEq("setOnRegistration", true),
    alwaysWithTranslation("title_set_on_registration"),
  ],
  [
    R.propEq("type", ("increase": LimitChangeType)),
    alwaysWithTranslation("title_increased"),
  ],
  [
    R.propEq("type", ("decrease": LimitChangeType)),
    alwaysWithTranslation("title_decreased"),
  ],
  [
    R.propEq("type", ("removed": LimitChangeType)),
    alwaysWithTranslation("title_removed"),
  ],
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
    <Flex
      direction="vertical"
      align="stretch"
      spacing="none"
      className="u-padding--md u-height--full t-background-white u-margin-top t-border-r--none@mobile t-border-r u-overflow--hidden"
    >
      <Flex
        align="center"
        justify="space-between"
        spacing="none"
        className="u-padding--md"
      >
        <Text tag="span" className="u-font-weight-bold o-flex--1">
          {t.history}
        </Text>
      </Flex>

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
                className={classNames(
                  "u-margin-left u-margin-right--lg t-background-grey-0 c-deposit-limits-history__left-bar",
                  i === props.history.length - 1 &&
                    "c-deposit-limits-history__left-bar--small"
                )}
              />
              <Flex
                direction="vertical"
                spacing="none"
                className="t-background-grey-0 u-padding--md t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-r-top-right--md o-flex--1"
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
                              className="t-color-grey-50 c-deposit-limits-history__change-icon"
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
  );
}
