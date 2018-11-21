// @flow
import React, { PureComponent } from "react";
import ComponentBuilder from "Components/ComponentBuilder";

// TODO: Make the slug dynamic.
// This is a temporary version which makes it possible for us
// to start deploying the Winter Campaign related stuff, although
// has to be fixed ASAP so we can link to any campaign page.
export default class PageCampaign extends PureComponent {
  render() {
    return <ComponentBuilder slug="campaigns.winter-campaign" />;
  }
}
