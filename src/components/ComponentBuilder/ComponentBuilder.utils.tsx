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

export const prefixCampaignPromotion = (
  contentDefinition: ContentDefinition
) => {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '<T, V>(val: T) => V' is not assi... Remove this comment to see the full error message
  const parsedJSON = JSON.parse(contentDefinition);
  return Array.isArray(parsedJSON)
    ? parsedJSON.map(comp => {
        if (comp["acf_fc_layout"] === "PROMOTION_CARDS_HORIZONTAL") {
          return {
            ...comp,
            slug_2: `campaigns.${comp.slug_2}`,
          };
        }
        return comp;
      })
    : parsedJSON;
};
