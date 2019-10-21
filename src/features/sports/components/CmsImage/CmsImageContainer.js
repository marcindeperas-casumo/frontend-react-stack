// @flow

import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import logger from "Services/logger";

// We need this shenanigans to have static typing for the data returned from the query.
// This will go away as soon as switching to Apollo Hooks.
class CmsImageTypedQuery extends Query<CmsImageQuery, CmsImageQueryVariables> {}

export const CMS_IMAGE_QUERY = gql`
  query CmsImageQuery($key: String!) {
    sportsCmsImage(key: $key)
  }
`;

type Props = {
  /** The key of the image in the CMS. */
  id: string,
  /** Additional css classes to add to the component */
  className?: string,
};

export const CmsImageContainer = ({ id, className }: Props): React.Node => (
  <CmsImageTypedQuery query={CMS_IMAGE_QUERY} variables={{ key: id }}>
    {({ data, loading }) => {
      if (loading) {
        return null;
      }

      if (!data || !data.sportsCmsImage) {
        logger.error(`Sports/Components/CmsImage - Image not found "${id}"`);

        return null;
      }

      return (
        <ResponsiveImage src={data.sportsCmsImage} className={className} />
      );
    }}
  </CmsImageTypedQuery>
);
