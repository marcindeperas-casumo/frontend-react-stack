// @flow
import React, { useState, useEffect, useCallback } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import logger from "Services/logger";

type YearSelectorProps = {
  selectedYear: number,
  yearOptions: Array<number>,
  setYear: number => void,
  htmlId: string,
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
  selectorHtmlId: string,
};

function YearSelector({
  selectedYear,
  yearOptions,
  setYear,
  htmlId,
}: YearSelectorProps) {
  const onChangeYear = useCallback(e =>
    setYear(Number.parseInt(e.target.value, 10))
  );

  return (
    <select id={htmlId} value={selectedYear} onChange={onChangeYear}>
      {yearOptions.map(year => (
        <option key={`key_${year}`} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export function TransactionsBetsHistoryYearSelector({
  fetchContent,
  isContentFetched,
  content,
  fetchYearOverview,
  yearOptions,
  selectedYear,
  selectorHtmlId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(selectedYear);
  const [isTriggeredFetch, triggerFetch] = useState(false);
  const onClick = useCallback(() => {
    triggerFetch(true);
  });

  useEffect(() => {
    if (!isTriggeredFetch) {
      return;
    }

    setLoading(true);
    triggerFetch(false);

    fetchYearOverview(year).catch(e => {
      logger.error(e);
      setLoading(false);
    });
  }, [fetchYearOverview, isTriggeredFetch, year]);

  useEffect(() => {
    if (!isContentFetched) {
      fetchContent();
    }
  }, [fetchContent, isContentFetched]);

  return (
    <div className="u-padding-y--lg u-padding-x--md t-background-white">
      <Text tag="h3" size="sm">
        {content.annual_overview_year_selector_heading}
      </Text>
      <Flex
        spacing="md"
        justify="space-between"
        align="center"
        className="u-margin-y--lg"
      >
        <Flex.Item>
          <Text tag="label" size="sm" htmlFor={selectorHtmlId}>
            {content.annual_overview_year_selector_label}
          </Text>
        </Flex.Item>
        <Flex.Item>
          <YearSelector
            yearOptions={yearOptions}
            selectedYear={year}
            setYear={setYear}
            htmlId={selectorHtmlId}
          />
        </Flex.Item>
      </Flex>
      <Button
        className="u-width--1/1"
        disabled={loading}
        loading={loading}
        onClick={onClick}
      >
        {content.annual_overview_year_selector_button}
      </Button>
    </div>
  );
}
