import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { ProfileIcon } from "./ProfileIcon";

const stories = storiesOf("ProfileIcon", module);

const Wrapper = ({ children }) => (
  <div
    className="c-reel-race-icon o-position--relative u-zindex--content-overlay o-position--relative u-height--3xlg u-width--3xlg
t-border-r--circle o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left"
  >
    <div className="t-border-r--circle u-height--full u-overflow--hidden o-position--relative u-zindex--content-overlay">
      {children}
    </div>
  </div>
);

stories.add("Default", () => {
  return (
    <div
      className="bg-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
      style={{
        height: 48,
        boxSizing: "content-box",
      }}
    >
      <Wrapper>
        <ProfileIcon
          onClick={action("clicked")}
          belt="red"
          level={11}
          progressPercentage={25}
        />
      </Wrapper>
    </div>
  );
});
