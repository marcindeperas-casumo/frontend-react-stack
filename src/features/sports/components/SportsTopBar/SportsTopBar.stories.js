// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import SportsTopBar, { hashes } from "./SportsTopBar";
import mocks from "./__mocks__/termMocks";

const stories = storiesOf("Sports/SportsTopBar", module);

stories.addDecorator(story => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {story()}
  </MockedProvider>
));

// set almost invisible background so chromatic can distinguish between `hidden` and `display: none`
const background = "#fffffe";

const render = (props, isMobile) => () => (
  <div
    id="c-sports-shell"
    className={isMobile ? "c-sports-shell--mobile" : "c-sports-shell--site"}
    style={{ background }}
  >
    <SportsTopBar {...props} />
  </div>
);

stories.add("Site: Home Active", render({ currentHash: hashes.home }));

stories.add(
  "Site: Search Active",
  render({ currentHash: hashes.home, isSearchVisible: true })
);

stories.add("Site: My Bets Active", render({ currentHash: hashes.betHistory }));

stories.add("Mobile (hidden)", render({ currentHash: hashes.home }, true));
