// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
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
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore state={state}>
        <OptInButtonContainer
          {...props}
          slug="the_page_we_need"
          optInField="foo"
          optOutField="bar"
        />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default",
  () => {
    return <OptInButton {...props} />;
  },
  info({ text: "Default" })
);

stories.add(
  "Opted-In",
  () => {
    const isOptedIn = true;

    return <OptInButton {...props} isOptedIn={isOptedIn} />;
  },
  info({ text: "Default" })
);

stories.add(
  "With Button Callback",
  () => {
    const customProps = Object.assign({}, props, {
      active: {
        ...props.active,
        buttonCallback: action("click"),
      },
    });

    return <OptInButton {...customProps} />;
  },
  info({ text: "Default" })
);
