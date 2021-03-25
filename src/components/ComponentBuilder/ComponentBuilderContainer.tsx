import { useQuery, gql } from "@apollo/client";
import React from "react";
import { propOr } from "ramda";
import logger from "Services/logger";
import { ComponentBuilderRenderer } from "./ComponentBuilderRenderer";

type Props = {
  /** The slug of the CMS page containing the component definitions. */
  slug: string;
};

const QUERY = gql`
  query componentBuilderQuery($id: String!) {
    componentDefinitionJSON: getCMSFieldAsJSON(id: $id)
  }
`;

export const ComponentBuilderContainer = ({ slug }: Props) => {
  const cmsField = "content_builder";
  const id = `root:${slug}:fields.${cmsField}`;
  const variables = { id };
  const { data, loading } = useQuery(QUERY, { variables });
  const componentDefinitionJSONUnformatted = propOr(
    null,
    "componentDefinitionJSON",
    data
  );

  if (loading && !componentDefinitionJSONUnformatted) {
    return null;
  }
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '<T, V>(val: T) => V' is not assi... Remove this comment to see the full error message
  const parsedJSON = JSON.parse(componentDefinitionJSONUnformatted);
  const componentDefinitionJSON = Array.isArray(parsedJSON)
    ? parsedJSON.map(comp => {
        if (comp["acf_fc_layout"] === "PROMOTION_CARDS_HORIZONTAL") {
          return {
            ...comp,
            slug_2: `campaigns.${comp.slug_2}`,
          };
        }
        return comp;
      })
    : // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '<T, V>(val: T) => V' is not assi... Remove this comment to see the full error message
      JSON.parse(componentDefinitionJSONUnformatted);
  try {
    return (
      <ComponentBuilderRenderer
        componentDefinitions={componentDefinitionJSON}
      />
    );
  } catch (e) {
    logger.error(
      "ComponentBuilder: could not parse component definition JSON",
      { componentDefinitionJSON }
    );

    return null;
  }
};
