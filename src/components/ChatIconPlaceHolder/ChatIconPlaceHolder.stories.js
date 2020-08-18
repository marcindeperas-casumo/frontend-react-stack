import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ChatIconPlaceHolder } from "./ChatIconPlaceHolder";

const stories = storiesOf("ChatIconPlaceHolder", module);

stories.add("Default", () => {
  const fakeClickEvent = () => null;

  return (
    <>
      <ChatIconPlaceHolder onClickCallBack={fakeClickEvent} />
    </>
  );
});
