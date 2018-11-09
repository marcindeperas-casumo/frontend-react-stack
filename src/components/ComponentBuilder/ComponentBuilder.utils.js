// @flow
import React from "react";
import { COMPONENT_MAPPING } from "Components/ComponentBuilder/ComponentBuilder.mapping";

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
