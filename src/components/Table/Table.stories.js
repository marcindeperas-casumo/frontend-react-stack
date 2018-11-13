import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";

import Table from "Components/Table";
import rows from "Components/Table/__mocks__/tabledata.json";
const stories = storiesOf("Table", module);

const Image = src => <img src={src} alt="" />;
const CashAmount = amount => (
  <p className="u-margin-bottom--none t-color-blue u-font-weight-bold u-text-align-right">
    {amount}
  </p>
);

stories.add(
  "Default",
  () => <Table rows={rows} thumbnail={Image} prize={CashAmount} />,
  info({ text: "Default" })
);
