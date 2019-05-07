// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { ParagraphSkeleton } from "./Paragraph";

const stories = storiesOf("Skeleton/Paragraph", module);
stories.add(
  "Default",
  () => {
    const size = select(
      "Size",
      ["xs", "sm", "default", "md", "lg", "xlg", "2xlg", "3xlg", "4xlg"],
      "default"
    );

    return <ParagraphSkeleton size={size} />;
  },
  info({ text: "Paragraph of text" })
);