// @flow
import React, { useState } from "react";
import ReactModal from "react-modal";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs/react";
import { mockValuable as getValuableByType } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import { WaitForHostElement } from "Components/WaitForHostElement";
import { ValuableDetails } from "./ValuableDetails";
import { labels } from "./__mocks__/mocks";

const hostElementId = "portal-host-element";
const stories = storiesOf("ValuableDetails", module);

const getParent = () => document.querySelector(`#${hostElementId}`);

function ValuableDetailsStory() {
  const [isOpen, setOpen] = useState(true);
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.SPINS) ||
    VALUABLE_TYPES.SPINS;
  const isLocked = boolean("Locked", false);
  const isLoading = boolean("Loading", false);
  const error = select("Error", { true: "foobar", false: null }, null);
  const valuable = getValuableByType(valuableType);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  ReactModal.setAppElement(document.createElement("div"));
  return (
    <ValuableDetails
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      {...valuable}
      title="Gives you €50 in bonus money"
      onConsumeValuable={async () => ({ data: { useValuable: true } })}
      valuableState={valuableState}
      parentSelector={getParent}
      closeTimeoutMS={100}
      labels={labels}
      loading={isLoading}
      error={error}
      refetch={() => {}}
    />
  );
}

stories
  .addDecorator(story => (
    <WaitForHostElement hostElementId={hostElementId}>
      {story()}
    </WaitForHostElement>
  ))
  .add("Default", ValuableDetailsStory);
