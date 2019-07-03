// @flow
import React, { useState, useEffect, useCallback } from "react";
import { range } from "ramda";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = range(2016, CURRENT_YEAR + 1);
const YEAR_SELECT_ID = "transactions-annual-year-selector";

type YearSelectorProps = {
  selectedYear: number,
  setYear: number => void,
};

function YearSelector({ selectedYear, setYear }: YearSelectorProps) {
  const onChangeYear = e => setYear(Number.parseInt(e.target.value));

  return (
    <select id={YEAR_SELECT_ID} value={selectedYear} onChange={onChangeYear}>
      {AVAILABLE_YEARS.map(year => (
        <option value={year}>{year}</option>
      ))}
    </select>
  );
}

type Props = {};

export function TransactionsAnnualYearSelector(props: Props) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [isTriggeredFetch, triggerFetch] = useState(false);
  const onClick = useCallback(() => {
    triggerFetch(true);
  });

  useEffect(() => {
    if (!isTriggeredFetch) {
      return;
    }

    setLoading(true);

    // ACTUAL FETCH

    triggerFetch(false);

    setTimeout(() => setLoading(false), 3000);
  }, [isTriggeredFetch]);

  return (
    <div className="u-padding-top--lg u-padding-bottom--lg u-padding-left--md u-padding-right--md t-background-white">
      <Text tag="h3" size="sm">
        Annual Transactions Overview
      </Text>
      <Flex
        spacing="md"
        justify="space-between"
        align="center"
        className="u-margin-top--lg u-margin-bottom--lg"
      >
        <Flex.Item>
          <Text tag="label" size="sm" htmlFor={YEAR_SELECT_ID}>
            Year
          </Text>
        </Flex.Item>
        <Flex.Item>
          <YearSelector selectedYear={year} setYear={setYear} />
        </Flex.Item>
      </Flex>
      <Button
        className="u-width--1/1"
        disabled={loading}
        loading={loading}
        onClick={onClick}
      >
        Show Annual Overview
      </Button>
    </div>
  );
}
