import React from "react";
import { COMPONENT_MAPPING } from "Components/ComponentBuilder/ComponentBuilder.mapping";
import logger from "Services/logger";

type ContentDefinition = {
  acf_fc_layout: string;
};

export const mapContentDefinitionToComponent = (
  contentDefinition: ContentDefinition
) => {
  const typeKey = "acf_fc_layout";
  const { [typeKey]: type, ...rest } = contentDefinition;
  const Component = COMPONENT_MAPPING[type];

  if (!Component) {
    logger.error("ComponentBuilder: component not found", {
      contentDefinition,
    });

    return null;
  }

  return <Component {...rest} />;
};
