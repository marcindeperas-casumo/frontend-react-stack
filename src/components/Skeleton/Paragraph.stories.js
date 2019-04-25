// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { ParagraphSkeleton } from "./Paragraph";

const stories = storiesOf("Skeleton/Paragraph", module);
stories.add(
  "Default",
  () => {
    const fontSize = number("Font size", 12, {
      range: true,
      min: 4,
      max: 30,
      step: 1,
    });
    const lineHeight = number("Line height", 16, {
      range: true,
      min: 0,
      max: 50,
      step: 0.2,
    });
    const radius = number("Border radius", 2, {
      range: true,
      min: 0,
      max: 50,
      step: 1,
    });

    return (
      <ParagraphSkeleton
        fontSize={fontSize}
        lineHeight={lineHeight}
        radius={radius}
      />
    );
  },
  info({ text: "Paragraph of text" })
);
