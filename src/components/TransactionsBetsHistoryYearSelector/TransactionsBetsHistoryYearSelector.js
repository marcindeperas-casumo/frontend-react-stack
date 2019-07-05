// @flow
import React, { useState, useEffect, useCallback } from "react";
import { range, propOr } from "ramda";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import logger from "Services/logger";

const YEAR_SELECT_ID = "transactions-annual-year-selector";

type YearSelectorProps = {
  selectedYear: number,
  yearOptions: Array<number>,
  setYear: number => void,
};

type Content = {
  [string]: string,
};

type Props = {
  fetchContent: () => void,
  isContentFetched: boolean,
  content: Content,
  fetchYearOverview: number => any,
  yearOptions: Array<number>,
  selectedYear: number,
};

function YearSelector({
  selectedYear,
  yearOptions,
  setYear,
}: YearSelectorProps) {
  const onChangeYear = useCallback(e =>
    setYear(Number.parseInt(e.target.value))
  );

  return (
    <select id={YEAR_SELECT_ID} value={selectedYear} onChange={onChangeYear}>
      {yearOptions.map(year => (
        <option key={`key_${year}`} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

const fallbackContent = {
  year_selector_heading: "Annual Transactions Overview",
  year_selector_label: "Year",
  year_selector_button: "Show Annual Overview",
};

export function TransactionsBetsHistoryYearSelector({
  fetchContent,
  isContentFetched,
  content,
  fetchYearOverview,
  yearOptions,
  selectedYear,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(selectedYear);
  const [isTriggeredFetch, triggerFetch] = useState(false);
  const onClick = useCallback(() => {
    triggerFetch(true);
  });
  const fullContent = {
    ...fallbackContent,
    ...content,
  };

  useEffect(() => {
    if (!isTriggeredFetch) {
      return;
    }

    setLoading(true);
    triggerFetch(false);

    (async () => {
      try {
        await fetchYearOverview(year);
      } catch (e) {
        logger.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchYearOverview, isTriggeredFetch, year]);

  useEffect(() => {
    isContentFetched || fetchContent();
  }, [fetchContent, isContentFetched]);

  return (
    <div className="u-padding-top--lg u-padding-bottom--lg u-padding-left--md u-padding-right--md t-background-white">
      <Text tag="h3" size="sm">
        {fullContent.year_selector_heading}
      </Text>
      <Flex
        spacing="md"
        justify="space-between"
        align="center"
        className="u-margin-top--lg u-margin-bottom--lg"
      >
        <Flex.Item>
          <Text tag="label" size="sm" htmlFor={YEAR_SELECT_ID}>
            {fullContent.year_selector_label}
          </Text>
        </Flex.Item>
        <Flex.Item>
          <YearSelector
            yearOptions={yearOptions}
            selectedYear={year}
            setYear={setYear}
          />
        </Flex.Item>
      </Flex>
      <Button
        className="u-width--1/1"
        disabled={loading}
        loading={loading}
        onClick={onClick}
      >
        {fullContent.year_selector_button}
      </Button>
    </div>
  );
}
