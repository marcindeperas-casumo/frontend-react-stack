import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import PromotionCard from "./PromotionCard";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("PromotionCard", module);

stories.add(
  "Default",
  () => {
    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "256px" }}
      >
        <PromotionCard slug="promotion 1" onClick={action("test-me")} />
      </div>
    );
  },
  info({ text: "Default" })
);
