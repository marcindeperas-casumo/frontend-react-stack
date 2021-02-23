// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Text from "@casumo/cmp-text";
import { SidebarElementWrapper } from "./SidebarElementWrapper";

const stories = storiesOf("SidebarElementWrapper", module);

const content = (
  <Text className="t-color-white u-padding u-padding-top--xlg t-background-black">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet
    posuere sapien, quis consectetur tellus tincidunt ac. Morbi varius urna et
    rhoncus gravida. Phasellus id risus molestie, vehicula mi ut, pulvinar
    purus. Suspendisse potenti. Sed facilisis magna eu sem congue vehicula. Duis
    eros leo, sollicitudin sed aliquam et, laoreet eget nibh. Nullam maximus sit
    amet tellus et rutrum. Donec vel eros enim. Nulla porta, odio ac scelerisque
    imperdiet, lacus enim luctus dolor, at fermentum ligula mauris non turpis.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia curae;
  </Text>
);

stories.add("Default", () => {
  return (
    <div>
      <h2>Pinnable</h2>
      <SidebarElementWrapper pinnable />
      <h2>Not pinnable</h2>
      <SidebarElementWrapper />
      <h2>Pinnable with content</h2>
      <SidebarElementWrapper pinnable>{content}</SidebarElementWrapper>
      <h2>Not pinnable</h2>
      <SidebarElementWrapper>{content}</SidebarElementWrapper>
    </div>
  );
});
