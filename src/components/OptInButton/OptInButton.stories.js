// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import optin from "./__mocks__/optin.json";
import OptInButton from "./OptInButton";
import OptInButtonContainer from "./OptInButtonContainer";

const stories = storiesOf("OptInButton", module);

const state = {
  schema: {
    cms: optin,
  },
};

const props = {
  active: {
    label: "Opt-In",
    eventName: "foo",
    data: {
      foo: "bar",
    },
  },
  disabled: {
    label: "Opted-In",
    eventName: "bar",
    data: {
      bar: "foo",
    },
  },
  className: "",
  isOptedIn: false,
};

if (isNotChromatic) {
  stories.add("Default (Connected)", () => (
    <MockStore state={state}>
      <OptInButtonContainer
        {...props}
        slug="the_page_we_need"
        optInField="foo"
        optOutField="bar"
      />
    </MockStore>
  ));
}

stories.add("Default", () => {
  return <OptInButton {...props} />;
});

stories.add("Opted-In", () => {
  const isOptedIn = true;

  return <OptInButton {...props} isOptedIn={isOptedIn} />;
});

stories.add("With Button Callback", () => {
  const customProps = Object.assign({}, props, {
    active: {
      ...props.active,
      onClick: action("click"),
    },
  });

  return <OptInButton {...customProps} />;
});
