// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProfileIcon } from "./ProfileIcon";

const stories = storiesOf("ProfileIcon", module);

const Wrapper = ({ children }) => (
  <div
    className="c-reel-race-icon u-position-relative u-zindex--content-overlay t-background-grey-90 u-position-relative u-height--2xlg u-width--2xlg
t-border-r--circle t-border--xlg t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left"
  >
    <div className="t-border-r--circle u-height--full u-overflow-hidden u-position-relative u-zindex--content-overlay">
      {children}
    </div>
  </div>
);

stories.add("Default", () => {
  return (
    <div
      className="t-background-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
      style={{
        height: 48,
        boxSizing: "content-box",
      }}
    >
      <Wrapper>
        <ProfileIcon onClick={action("clicked")} />
      </Wrapper>
    </div>
  );
});
