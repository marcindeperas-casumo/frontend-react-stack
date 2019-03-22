/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import MessagePage from "./MessagePage";

const stories = storiesOf("Sports/MessagePage", module);

const props = {
  comingSoon: {
    heading: "COMING SOON",
    message:
      "Sports only works on mobile and tablet devices. We’re working on adding it here, too.",
    image: <div />,
  },
  maintenance: {
    heading: `WORKS IN\nPROGRESS`,
    message:
      "We’re currently doing some work on Casumo Sports. Please check again soon.",
    image: <div />,
  },
};

stories.add("Coming Soon", () => <MessagePage {...props.comingSoon} />);

stories.add("Maintenance", () => <MessagePage {...props.maintenance} />);
