// @flow
import React from "react";
import DangerousHtml from "Components/DangerousHtml";
import TopListContainer from "Containers/TopListContainer";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: DangerousHtml,
  GAMES_LIST: TopListContainer,
};

type ContentDefinition = {
  acf_fc_layout: string,
};

export const mapContentDefinitionToComponent = (
  contentDefinition: ContentDefinition,
  i: number
) => {
  const typeKey = "acf_fc_layout";
  const { [typeKey]: type, ...rest } = contentDefinition;
  const component = COMPONENT_MAPPING[type];

  if (!component) {
    // TODO: add error logging here
    return null;
  }

  return React.createElement(component, { ...rest, key: i });
};
