// @flow
import React from "react";
import MessagePage from "./MessagePage";

type Props = {
  headingTermKey: string,
  messageTermKey: string,
  image: Node,
};

// prettier-ignore
const WarningIcon = () => (
  <svg width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="56"><rect width="64" height="56" fill="#C4C4C4"/></mask>
  <g mask="url(#mask0)">k<path fill-rule="evenodd" clip-rule="evenodd" d="M30.6011 19.5533C33.1184 18.7 35.8393 20.0836 36.6779 22.6451C37.0197 23.6886 36.9954 24.7676 36.6779 25.7369L33.6395 35.0123C33.36 35.8655 32.453 36.3278 31.6144 36.0434C31.1192 35.8749 30.7561 35.4776 30.6011 35.0123L27.5628 25.7369C26.7242 23.1753 28.0838 20.4067 30.6011 19.5533ZM29.0819 41.1959C29.0819 39.4877 30.4416 38.1041 32.1203 38.1041C33.7975 38.1041 35.1587 39.4877 35.1587 41.1959C35.1587 42.9042 33.7975 44.2876 32.1203 44.2876C30.4416 44.2876 29.0819 42.9042 29.0819 41.1959Z" fill="#303838"/>
  <path d="M26.8038 5.75343C29.1132 1.75342 34.8867 1.75342 37.1961 5.75342L59.8552 45C62.1646 49 59.2778 54 54.659 54H9.34097C4.72217 54 1.83541 49 4.14481 45L26.8038 5.75343Z" stroke="#C9D6D6" stroke-width="4"/></g>
  </svg>
);

const MaintenancePage = () => (
  <MessagePage
    image={<WarningIcon />}
    headingTermKey="maintenance.heading"
    messageTermKey="maintenance.message"
  />
);

export default MaintenancePage;
