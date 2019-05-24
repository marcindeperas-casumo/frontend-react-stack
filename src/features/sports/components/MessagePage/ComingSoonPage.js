// @flow
import React from "react";
import MessagePage from "./MessagePage";

// prettier-ignore
const ComingSoonIcon = () => (
  <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.5" y="1.5" width="52" height="34" rx="2.5" stroke="#C9D6D6" stroke-width="3"/>
  <path d="M28 46L45 46" stroke="#C9D6D6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M31 46L32 36" stroke="#C9D6D6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M42 46L41 36" stroke="#C9D6D6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="6.5" y="23.5" width="18" height="23" rx="2.5" fill="#EEF6F6" stroke="#303838" stroke-width="3"/>
  <rect x="1.5" y="32.5" width="10" height="14" rx="2.5" fill="#EEF6F6" stroke="#303838" stroke-width="3"/>
  <rect x="14" y="41" width="3" height="3" rx="1.5" fill="#303838"/>
  <rect x="5" y="41" width="3" height="3" rx="1.5" fill="#303838"/>
  </svg>
);

const ComingSoonPage = () => (
  <MessagePage
    image={<ComingSoonIcon />}
    headingTermKey="coming-soon.heading"
    messageTermKey="coming-soon.message"
  />
);

export { ComingSoonPage };
