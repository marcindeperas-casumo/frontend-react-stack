// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { menu, wallet, walletUK } from "./__mocks__/SideBar.mock";
import { SideBar } from "./SideBar";

const stories = storiesOf("SideBar", module);

stories.add("Default", () => (
  <SideBar username="username" wallet={wallet} menu={menu} />
));

stories.add("Short with bonus", () => (
  // eslint-disable-next-line fp/no-mutating-methods
  <SideBar username="ImRichDude" wallet={walletUK} menu={[menu.pop()]} />
));
