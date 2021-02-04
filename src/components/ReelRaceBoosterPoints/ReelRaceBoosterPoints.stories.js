// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import { ReelRaceIcon } from "../ReelRaceIcon";

const stories = storiesOf("ReelRaceBoosterPoints", module);

const getCurrentRace = (value = null) => ({
  boosters: {
    bigWins: 0,
    megaWins: 0,
    triples: 0,
    wins: 0,
  },
  position: value || 1,
  remainingSpins: value || 99,
  points: value || 42,
  startTime: Date.now() - 10000,
  endTime: Date.now() + 3000,
});

const Wrapper = ({ children, withBg = true }) => (
  <div
    className={`c-reel-race-icon u-position-relative u-zindex--content-overlay u-position-relative u-height--3xlg u-width--3xlg
t-border-r--circle t-border--none t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left ${
      withBg ? "t-background-grey-90" : ""
    }`}
  >
    <div className="t-border-r--circle u-height--full u-position-relative u-zindex--content-overlay">
      {children}
    </div>
  </div>
);

stories.add("Reel Race Booster Points Animation", () => {
  const boosters = {
    bigWins: number("Big Wins", 0),
    megaWins: number("Mega Wins", 0),
    triples: number("Triples", 0),
    wins: number("Wins", 0),
  };

  const currentRace = getCurrentRace();
  currentRace.boosters = boosters;

  return (
    <div className="o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x u-margin-top--2xlg">
      <Wrapper withBg={false}>
        <ReelRaceIcon onClick={action("clicked")} currentRace={currentRace} />
      </Wrapper>
    </div>
  );
});
