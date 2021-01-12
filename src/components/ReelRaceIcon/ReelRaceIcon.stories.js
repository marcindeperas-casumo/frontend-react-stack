// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReelRaceIcon } from "./ReelRaceIcon";
import { RRIconView } from "./views/RRIconView";
import { PositionView } from "./views/PositionView";
import { RemainingSpinsView } from "./views/RemainingSpinsView";
import { PointsView } from "./views/PointsView";

const stories = storiesOf("ReelRaceIcon", module);

const getCurrentRace = (value = null) => ({
  position: value || 1,
  remainingSpins: value || 99,
  points: value || 42,
  startTime: Date.now() - 10000,
  endTime: Date.now() + 3000,
});
const commonProps = { pointsText: "pts" };

const views = [PositionView, RemainingSpinsView, PointsView];
const raceValues = [1, 2, 3, 4, 5, 6, 10, 11, 12, 20, 21, 50, 100, 101, 200];
const centerClass = "c-reel-race-icon__content u-position-absolute";

const Wrapper = ({ children, withBg = true }) => (
  <div
    className={`c-reel-race-icon u-position-relative u-zindex--content-overlay u-position-relative u-height--3xlg u-width--3xlg
t-border-r--circle t-border--none t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left ${
      withBg ? "t-background-grey-90" : ""
    }`}
  >
    <div className="t-border-r--circle u-height--full u-overflow--hidden u-position-relative u-zindex--content-overlay">
      {children}
    </div>
  </div>
);

stories.add("Default", () => {
  return (
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
        <Wrapper withBg={false}>
          <ReelRaceIcon
            onClick={action("clicked")}
            currentRace={getCurrentRace()}
          />
        </Wrapper>
      </div>
      <br />
      <div>
        <h2>RRIconView</h2>
        <Wrapper>
          <RRIconView className={centerClass} />
        </Wrapper>
      </div>
      {views.map((View, viewIndex) => (
        <div key={viewIndex}>
          <br />

          <h2>{View.displayName}</h2>
          <div className="o-flex--horizontal">
            {raceValues.map((raceValue, i) => (
              <Wrapper key={i}>
                <View
                  className={centerClass}
                  {...getCurrentRace(raceValue)}
                  {...commonProps}
                />
              </Wrapper>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
