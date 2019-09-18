// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";
import isNotChromatic from "Storybook/isNotChromatic";
import { cmsImageMocks } from "./CmsImage.mocks";
import { CmsImageContainer as CmsImage } from "./CmsImageContainer";

const stories = storiesOf("Sports/CmsImage", module);

if (isNotChromatic) {
  stories.add("Default", () => (
    <MockedProvider mocks={cmsImageMocks} addTypename={false}>
      <CmsImage id="favourite-sports-selector.intro.sports" />
    </MockedProvider>
  ));
}
