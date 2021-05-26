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

export const ComponentBuilderContainer = ({ slug, ...rest }: Props) => {
  const cmsField = "content_builder";
  const id = `root:${slug}:fields.${cmsField}`;
  const variables = { id };
  const { data, loading } = useQuery(QUERY, { variables });
  const componentDefinitionJSON = propOr(null, "componentDefinitionJSON", data);

  if (loading && !componentDefinitionJSON) {
    return null;
  }

  try {
    return (
      <ComponentBuilderRenderer
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '<T, V>(val: T) => V' is not assi... Remove this comment to see the full error message
        componentDefinitions={JSON.parse(componentDefinitionJSON)}
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
