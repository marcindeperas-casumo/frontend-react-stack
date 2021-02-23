// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MaskItem from ".";

const stories = storiesOf("MaskItem", module);

const shape = () => (
  <path d="M46.0199 66.5099C26.5859 66.9646 8.11145 67.6742 2.06447 67.916C0.927926 67.9615 0 67.0518 0 65.9144V10C0 4.47715 4.47715 0 10 0H134C139.523 0 144 4.47715 144 10V65.9011C144 67.0435 143.062 67.9553 141.921 67.9034C135.889 67.6291 117.575 66.8374 98.0838 66.4039C97.9959 66.4949 97.9063 66.5846 97.8149 66.6729L87.1967 76.9244C85.158 78.8931 82.3919 80 79.507 80H64.4921C61.6081 80 58.842 78.8931 56.8024 76.9244L46.1851 66.6729C46.1294 66.6191 46.0743 66.5648 46.0199 66.5099Z" />
);

stories.add("Default", () => (
  <MaskItem id="123" width={144} height={80} shapeMask={shape}>
    <div
      className="t-background-yellow-30"
      style={{ width: "200px", height: "200px" }}
    />
  </MaskItem>
));
