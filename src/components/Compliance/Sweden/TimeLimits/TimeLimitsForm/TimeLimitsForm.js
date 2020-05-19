// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { TextInput } from "Components/Compliance/TextInput";
import { textInputOnChange } from "./TimeLimitsForm.utils";

type Props = {
  t: {
    top_header: string,
    cta: string,
    hrs_per_day: string,
    hrs_per_week: string,
    hrs_per_month: string,
    placeholder_enter_amount: string,
  },
};

export function TimeLimitsForm({ t }: Props) {
  const [hrsPerDay, setHrsPerDay] = React.useState();
  const [hrsPerWeek, setHrsPerWeek] = React.useState();
  const [hrsPerMonth, setHrsPerMonth] = React.useState();

  return (
    <Flex
      direction="vertical"
      align="stretch"
      spacing="md"
      className="u-padding"
    >
      <Flex.Item>
        <Text className="u-font-weight-bold u-text-align-center">
          {t.top_header}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Flex align="center" spacing="md">
          <Flex.Item className="u-width--2/3">
            <TextInput
              currencySign=""
              value={hrsPerDay}
              inputClassName="u-text-align-right u-font t-color-green"
              onChange={textInputOnChange(setHrsPerDay)}
            />
          </Flex.Item>
          <Flex.Item>
            <Text tag="span" className="u-text-nowrap">
              {t.hrs_per_day}
            </Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <Flex align="center" spacing="md">
          <Flex.Item className="u-width--2/3">
            <TextInput
              currencySign=""
              value={hrsPerWeek}
              inputClassName="u-text-align-right u-font t-color-green"
              onChange={textInputOnChange(setHrsPerWeek)}
            />
          </Flex.Item>
          <Flex.Item>
            <Text tag="span" className="u-text-nowrap">
              {t.hrs_per_week}
            </Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <Flex align="center" spacing="md">
          <Flex.Item className="u-width--2/3">
            <TextInput
              currencySign=""
              value={hrsPerMonth}
              inputClassName="u-text-align-right u-font t-color-green"
              onChange={textInputOnChange(setHrsPerMonth)}
            />
          </Flex.Item>
          <Flex.Item>
            <Text tag="span" className="u-text-nowrap">
              {t.hrs_per_month}
            </Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <Button variant="primary" className="u-width--full">
          {t.cta}
        </Button>
      </Flex.Item>
    </Flex>
  );
}
