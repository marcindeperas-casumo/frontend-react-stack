// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs/react";
import { IconWallet } from "../icons";
import { SidebarRow } from "./SidebarRow";

const stories = storiesOf("SidebarRow", module);

stories.add("Default", () => {
  const textVal = text("Text", "£987.65");
  const labelVal = text("Text Small", "+ £55.03 Bonus");
  const linkVal = text("Link", "/faq");
  const selectedVal = boolean("Selected", false);
  const secondaryVal = boolean("Secondary white row", false);

  return (
    <SidebarRow
      text={textVal}
      label={labelVal}
      Icon={IconWallet}
      selected={selectedVal}
      secondary={secondaryVal}
      link={linkVal}
    />
  );
});
