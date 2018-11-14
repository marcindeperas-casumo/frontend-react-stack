// @flow
import React, { PureComponent } from "react";
import ComponentBuilder from "Components/ComponentBuilder";

export const getSlug = (language: string = "en") =>
  `built-pages.top-lists-${language}`;

type Props = {
  language: string,
};

export default class TopLists extends PureComponent<Props> {
  render() {
    const { language } = this.props;
    const slug = getSlug(language);

    return <ComponentBuilder slug={slug} />;
  }
}
