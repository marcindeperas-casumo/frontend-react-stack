// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import translations from "./__mocks__/Translations.json";
import mock from "./__mocks__/Valuables.json";
import { ValuableDetails } from "./ValuableDetails";

const stories = storiesOf("ValuableCardDetails/ValuableDetails", module);

stories.add("Default", () => {
  const dimensions = {
    width: 379,
    height: 271,
  };

  const ValuableCard = () => (
    <div
      className="u-drop-shadow--md"
      style={{
        height: "218px",
        width: "160px",
        background: "white",
        "box-shadow": "0px 10px 8px 0px rgba(201, 214, 214, 0.4)", // TODO: to check key
      }}
    ></div>
  );
  const valuableMock = mock[0];

  return (
    <ValuableDetails
      {...valuableMock}
      translations={translations}
      {...dimensions}
      valuableRenderer={<ValuableCard />}
    />
  );
});
