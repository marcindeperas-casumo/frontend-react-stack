import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { ArticlesList } from "./ArticlesList";
import { ArticlesListQuery } from "./ArticlesList.graphql";

type Props = A.ArticlesListQueryVariables & {
  title: string;
};

export const ArticlesListContainer = ({ slugs, title }: Props) => {
  const { data, loading } = useQuery<
    A.ArticlesListQuery,
    A.ArticlesListQueryVariables
  >(ArticlesListQuery, {
    variables: {
      slugs,
    },
  });

  return (
    !loading &&
    data && <ArticlesList title={title} articlesList={data.articlesList} />
  );
};
