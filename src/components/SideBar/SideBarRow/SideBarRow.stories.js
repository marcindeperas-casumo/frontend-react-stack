// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, text } from "@storybook/addon-knobs/react";
import { walletUK } from "../__mocks__/SideBar.mock";
import { IconWallet } from "../icons";
import { SideBarRow } from "./SideBarRow";

const stories = storiesOf("SideBarRow", module);

stories.add("Default", () => {
  const textVal = text("Text", walletUK.cash);
  const smallTextVal = text("Text Small", walletUK.bonus);
  const linkVal = text("Link", "/faq");
  const cssClassesVal = select(
    "CSS",
    { default: [], selected: [`selected`], white: [`white`] },
    []
  );

  return (
    <SideBarRow
      text={textVal}
      smallText={smallTextVal}
      Icon={IconWallet}
      cssClasses={cssClassesVal}
      link={linkVal}
    />
  );
});
