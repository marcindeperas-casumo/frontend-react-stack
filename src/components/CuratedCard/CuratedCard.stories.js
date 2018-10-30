import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import CuratedCard from "Components/CuratedCard";
import MockStore from "Components/MockStore";

const stories = storiesOf("CuratedCard", module);

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <div
          className="u-margin-left--auto u-margin-right--auto"
          style={{ maxWidth: "686px" }}
        >
          <CuratedCard />
        </div>
      </MockStore>
    );
  },
  info({ text: "Default" })
);
