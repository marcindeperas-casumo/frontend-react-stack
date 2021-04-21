import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Pill } from "Components/Pill";

const stories = storiesOf("Pill", module);

const pills = [
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
          activeClassNames="bg-white t-border t-border-current"
        >
          La Liga
        </Pill>
        <Pill
          onClick={action("click")}
          inactiveClassNames="bg-red-30 t-border t-border-current text-white"
        >
          La Liga
        </Pill>
      </React.Fragment>
    ),
  },
];

pills.map(({ title, cmp }) => stories.add(title, cmp));
