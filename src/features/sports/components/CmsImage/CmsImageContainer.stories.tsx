import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { cmsImageMocks } from "./CmsImage.mocks";
import { CmsImageContainer as CmsImage } from "./CmsImageContainer";

const stories = storiesOf("Sports/CmsImage", module);

if (isNotChromatic) {
  stories.add("Default", () => (
    <MockedProvider mocks={cmsImageMocks} addTypename={false}>
      {/* @ts-expect-error ts-migrate(2786) FIXME: 'CmsImage' cannot be used as a JSX component. */}
      <CmsImage id="favourite-sports-selector.intro.sports" />
    </MockedProvider>
  ));
}
