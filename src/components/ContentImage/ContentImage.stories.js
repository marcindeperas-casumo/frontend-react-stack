// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ContentImage } from "./ContentImage";

const stories = storiesOf("ContentImage", module);
const src = "https://cms.casumo.com/wp-content/uploads/2018/10/Image-1.png";

stories.add("Default", () => <ContentImage src={src} alt="Sample image" />);
