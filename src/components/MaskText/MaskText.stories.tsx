// @flow
import { text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import MaskText from "Components/MaskText";

const stories = storiesOf("MaskText", module);
stories.addDecorator(withKnobs);

const TextColor = value => <span className="t-color-black">{value}</span>;
const TextGrey = value => <span className="t-color-grey-20">{value}</span>;

const TextMaskColored = props => (
  <MaskText matchRender={TextColor} unmatchedRender={TextGrey} {...props} />
);

if (isNotChromatic) {
  stories.add("Default", () => {
    const dynamic = text("Search Text", "");
    return (
      <div>
        <h3>
          <TextMaskColored text="hello" search="lo" />
        </h3>
        <h3>
          <TextMaskColored text="Startburst" search="burst" />
        </h3>
        <h3>
          <TextMaskColored text="Big Bad Wolf" search="big" />
        </h3>
        <h3>
          <TextMaskColored text="MEGA fortune" search="mega" />
        </h3>
        <h3>
          <TextMaskColored text="bar bar foo sheep" search="foo" />
        </h3>
        <h3>
          <TextMaskColored text="this is some dynamic text" search={dynamic} />
        </h3>
      </div>
    );
  });
}
