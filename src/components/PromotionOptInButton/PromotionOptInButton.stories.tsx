import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import optinData from "../OptInButton/__mocks__/optin.json";
import PromotionOptInButtonContainer from "./PromotionOptInButtonContainer";

const stories = storiesOf("PromotionOptInButton", module);

const state = {
  schema: {
    cms: optinData,
  },
};

if (isNotChromatic) {
  stories.add("Default (Connected)", () => {
    return (
      <MockStore state={state}>
        <PromotionOptInButtonContainer
          slug="the_page_we_need"
          optInField="fooKey"
          optOutField="barKey"
        />
      </MockStore>
    );
  });
}
