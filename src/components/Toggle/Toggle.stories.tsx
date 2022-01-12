import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import Flex from "@casumo/cmp-flex";
import MockStore from "Components/MockStore";
import { Toggle } from "./Toggle";

const stories = storiesOf("Toggle", module);

stories.add("Default", () => {
  function ToggleStory() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    return (
      <MockStore>
        <>
          <h2>Basic usage:</h2>
          <Toggle checked={checked1} onChange={value => setChecked1(value)} />
          <p>I am {checked1 ? "checked" : "unchecked"}</p>

          <h2>Disabled:</h2>
          <Toggle
            checked={checked1}
            disabled
            onChange={value => setChecked1(value)}
          />
          <p>I am {checked1 ? "checked" : "unchecked"}</p>

          <h2>Short labels: </h2>
          <Toggle
            labelOn="ON"
            labelOff="OFF"
            checked={checked2}
            onChange={value => setChecked2(value)}
          />

          <h2>Long label: </h2>
          <Toggle
            labelOn="That toggle is really ON!"
            labelOff="That one is for sure OFF now!"
            checked={checked3}
            onChange={value => setChecked3(value)}
          />
        </>
      </MockStore>
    );
  }

  return <ToggleStory />;
});
stories.add("Translated", () => {
  const t = [
    ["en", ["ON", "OFF"]],
    ["jp", ["オン", "オフ"]],
    ["at", ["AN", "AUS"]],
    ["no", ["AV", "PÅ"]],
    ["sv", ["PÅ", "AV"]],
    ["fi", ["PÄÄLLÄ", "POIS"]],
  ] as const;

  return (
    <MockStore>
      <>
        {t.map(x => (
          <Flex key={x[0]} align="center">
            <span style={{ width: 50 }}>{x[0]}</span>
            <Toggle
              labelOn={x[1][0]}
              labelOff={x[1][1]}
              checked
              onChange={() => {}}
            />
            <Toggle
              labelOn={x[1][0]}
              labelOff={x[1][1]}
              checked={false}
              onChange={() => {}}
            />
          </Flex>
        ))}
      </>
    </MockStore>
  );
});
