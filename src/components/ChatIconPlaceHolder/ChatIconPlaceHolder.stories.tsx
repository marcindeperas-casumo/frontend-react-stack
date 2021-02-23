import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ChatIconPlaceHolder } from "./ChatIconPlaceHolder";

const stories = storiesOf("ChatIconPlaceHolder", module);

stories.add("Default", () => {
  return (
    <>
      <ChatIconPlaceHolder onClick={action("clicked")} />
    </>
  );
});
