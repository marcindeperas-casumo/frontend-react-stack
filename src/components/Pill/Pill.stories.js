/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { Pill } from "Components/Pill";

const stories = storiesOf("Pill", module);

const buttons = [
  {
    title: "Default Pill",
    cmp: () => (
      <React.Fragment>
        <Pill onClick={action("click")} isActive>
          Serie A
        </Pill>
        <Pill onClick={action("click")}>Serie A</Pill>
      </React.Fragment>
    ),
  },
  {
    title: "Pill with Remove Icon",
    cmp: () => (
      <React.Fragment>
        <Pill onClick={action("click")} onRemove={action("remove")} isActive>
          Premier League
        </Pill>
        <Pill onClick={action("click")} onRemove={action("remove")}>
          Premier League
        </Pill>
      </React.Fragment>
    ),
  },
  {
    title: "Pill with Custom ClassNames",
    cmp: () => (
      <React.Fragment>
        <Pill
          onClick={action("click")}
          isActive
          activeClassNames="t-background-white t-border t-border--current-color"
        >
          La Liga
        </Pill>
        <Pill
          onClick={action("click")}
          inactiveClassNames="t-background-red t-border t-border--current-color t-color-white"
        >
          La Liga
        </Pill>
      </React.Fragment>
    ),
  },
];

buttons.map(({ title, cmp }) => stories.add(title, cmp, info({ text: title })));
