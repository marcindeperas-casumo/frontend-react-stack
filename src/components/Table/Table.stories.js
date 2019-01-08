// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";

import Table from "Components/Table";
import prizeData from "Components/Table/__mocks__/prizeData.json";
const stories = storiesOf("Table", module);

const Image = src => <img src={src} alt="" />;
const CashAmount = amount => (
  <p className="u-margin-bottom--none t-color-blue u-font-weight-bold u-text-align-right">
    {amount}
  </p>
);

stories.add(
  "Default",
  () => (
    <Table
      columnHeadings={["Name", "Age", "Spirit animal"]}
      rows={[
        { name: "Cho", age: 32, spiritAnimal: "🐶" },
        { name: "Michele", age: 30, spiritAnimal: "🐪" },
        { name: "Jack", age: 37, spiritAnimal: "🐧" },
        { name: "Levente", age: 29, spiritAnimal: "🦇" },
        { name: "Luke", age: 28, spiritAnimal: "🦑" },
        { name: "Chris", age: 22, spiritAnimal: "🐇" },
      ]}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Prize Table",
  () => (
    <Table
      displayHeader={false}
      rows={prizeData}
      thumbnail={Image}
      prize={CashAmount}
    />
  ),
  info({ text: "Default" })
);
