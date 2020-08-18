// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ProfileIcon from "./ProfileIcon";

const stories = storiesOf("ProfileIcon", module);

stories.add("Default", () => {
  return (
    <div
      className="t-background-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
      style={{
        height: 48,
        boxSizing: "content-box",
      }}
    >
      <ProfileIcon />
    </div>
  );
});
