// @flow

import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import logger from "Services/logger";

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

export const CmsImageContainer = ({ id, className }: Props): React.Node => {
  const variables = { key: id };
  const { data, loading } = useQuery(CMS_IMAGE_QUERY, { variables });

  if (loading) {
    return null;
  }

  if (!data || !data.sportsCmsImage) {
    logger.error(`Sports/Components/CmsImage - Image not found "${id}"`);

    return null;
  }

  return <ResponsiveImage src={data.sportsCmsImage} className={className} />;
};
