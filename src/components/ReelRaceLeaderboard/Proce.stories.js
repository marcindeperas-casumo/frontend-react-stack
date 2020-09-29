// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { Price } from "./Price";

const stories = storiesOf("ReelRaceLeaderboard/Price", module);

stories.add("Default", () => {
  return (
    <div>
      <br />
      <br />
      <div className="u-text-align-right">
        <Price price="$1" highlighted />
        <br />
        <br />
        <Price price="$50" highlighted />
        <br />
        <br />
        <Price price="$500" highlighted />
        <br />
        <br />
        <Price price="$5" />
        <br />
        <br />
        <Price price="$50" />
        <br />
        <br />
        <Price price="$500" />
      </div>
      <div>
        <Price price="$1" highlighted />
        <br />
        <br />
        <Price price="$50" highlighted />
        <br />
        <br />
        <Price price="$500" highlighted />
        <br />
        <br />
        <Price price="$5" />
        <br />
        <br />
        <Price price="$50" />
        <br />
        <br />
        <Price price="$500" />
      </div>
    </div>
  );
});
