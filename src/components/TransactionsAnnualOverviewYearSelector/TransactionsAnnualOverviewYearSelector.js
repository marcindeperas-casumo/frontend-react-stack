// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";

type YearSelectorProps = {
  selectedYear: number,
  yearOptions: Array<number>,
  setYear: number => void,
  htmlId: string,
};

type Content = {
  annual_overview_year_selector_heading: string,
  annual_overview_year_selector_label: string,
  annual_overview_year_selector_button: string,
};

type Props = {
  fetchContent: () => void,
  isContentFetched: boolean,
  content: Content,
  fetchYearOverview: number => any,
  isAnnualOverviewLoading: number => boolean,
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
  const onChangeYear = e => setYear(Number.parseInt(e.target.value, 10));

  return (
    <select
      id={htmlId}
      data-test-id="annual-overview-year-selector"
      value={selectedYear}
      onChange={onChangeYear}
    >
      {yearOptions.map(year => (
        <option key={`key_${year}`} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export function TransactionsAnnualOverviewYearSelector({
  fetchContent,
  isContentFetched,
  content,
  fetchYearOverview,
  yearOptions,
  selectedYear,
  selectorHtmlId,
  isAnnualOverviewLoading,
}: Props) {
  const [year, setYear] = React.useState(selectedYear);
  const [isTriggeredFetch, triggerFetch] = React.useState(false);
  const loading = isAnnualOverviewLoading(year);
  const onClick = () => {
    triggerFetch(true);
  };

  React.useEffect(() => {
    if (!isTriggeredFetch) {
      return;
    }

    triggerFetch(false);
    fetchYearOverview(year);
  }, [fetchYearOverview, isTriggeredFetch, year]);

  React.useEffect(() => {
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
      <ButtonPrimary
        className="u-width--full"
        data-test-id="annual-overview-year-selector-button"
        isDisabled={loading}
        isLoading={loading}
        onClick={onClick}
      >
        {content.annual_overview_year_selector_button}
      </ButtonPrimary>
    </div>
  );
}
