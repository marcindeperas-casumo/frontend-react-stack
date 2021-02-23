// @flow
import React from "react";
import { MessagePage } from "./MessagePage";
import ComingSoonIcon from "./icons/coming-soon.svg";

export const ComingSoonPage = () => (
  <MessagePage
    image={<ComingSoonIcon />}
    headingTermKey="coming-soon.heading"
    messageTermKey="coming-soon.message"
  />
);
