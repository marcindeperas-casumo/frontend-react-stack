// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { FiveMinuteBreakIcon } from "./FiveMinuteBreakIcon";

if (isChromatic) {
  MockDate.set(new Date("2021-01-01T00:00:00").toString());
}

const stories = storiesOf("Compliance/GGL/FiveMinuteBreakIcon", module);

const Wrapper = ({ children, withBg = true }) => (
  <div
    style={{
      boxSizing: "content-box",
    }}
  >
    <div
      className="t-background-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
      style={{
        height: 48,
      }}
    >
      <div className="u-color-white u-position-relative u-zindex--content-overlay o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left  u-height--3xlg u-width--3xlg">
        {children}
      </div>
    </div>
  </div>
);

stories.add("Default", () => {
  return (
    <Wrapper withBg={false}>
      <FiveMinuteBreakIcon
        onClick={action("clicked")}
        progressPercentage={81}
        expiringTime={Date.now() + 60 * 60 * 1000}
      />
    </Wrapper>
  );
});
stories.add("OneMinuteThreeSecondsLeft", () => {
  return (
    <Wrapper withBg={true}>
      <FiveMinuteBreakIcon
        onClick={action("clicked")}
        progressPercentage={81}
        expiringTime={Date.now() + 63 * 1000}
      />
    </Wrapper>
  );
});
stories.add("LessThanOneMinuteLeft", () => {
  return (
    <Wrapper withBg={true}>
      <FiveMinuteBreakIcon
        onClick={action("clicked")}
        progressPercentage={81}
        expiringTime={Date.now() + 50 * 1000}
      />
    </Wrapper>
  );
});
