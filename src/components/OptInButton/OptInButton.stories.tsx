import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import optinData from "./__mocks__/optin.json";
import OptInButton from "./OptInButton";
import OptInButtonContainer from "./OptInButtonContainer";

const stories = storiesOf("OptInButton", module);

const state = {
  schema: {
    cms: optinData,
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
  isOptedIn: false,
};

if (isNotChromatic) {
  stories.add("Default (Connected)", () => {
    const customProps = {
      ...props,
      active: {
        ...props.active,
        onClick: action("click"),
      },
      isOptedIn: boolean("Is Opted-In", false),
    };

    return (
      <MockStore state={state}>
        <OptInButtonContainer
          {...customProps}
          slug="the_page_we_need"
          optInField="fooKey"
          optOutField="barKey"
        />
      </MockStore>
    );
  });
}

stories.add("Default", () => {
  return <OptInButton {...props} />;
});

stories.add("Opted-In", () => {
  return <OptInButton {...props} isOptedIn />;
});
