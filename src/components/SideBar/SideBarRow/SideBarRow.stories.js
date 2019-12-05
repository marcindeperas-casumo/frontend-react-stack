// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs/react";
import { walletUK } from "../__mocks__/SideBar.mock";
import { IconWallet } from "../icons";
import { SideBarRow } from "./SideBarRow";

const stories = storiesOf("SideBarRow", module);

stories.add("Default", () => {
  const textVal = text("Text", walletUK.cash);
  const labelVal = text("Text Small", walletUK.bonus);
  const linkVal = text("Link", "/faq");
  const isSelectedVal = boolean("Selected", false);
  const isWhiteRowVal = boolean("White row", false);

  return (
    <SideBarRow
      text={textVal}
      label={labelVal}
      Icon={IconWallet}
      isSelected={isSelectedVal}
      isWhiteRow={isWhiteRowVal}
      link={linkVal}
    />
  );
});
