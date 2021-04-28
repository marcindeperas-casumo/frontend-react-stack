import Flex from "@casumo/cmp-flex";
import * as React from "react";
import classNames from "classnames";
import * as A from "Types/apollo";
import { ArticleThumbnail } from "./ArticleThumbnail";

type Props = {
  article: A.Article;
  onClick?: (article: A.Article) => void;
};

export const ArticleListRow = (props: Props) => {
  const { article, onClick } = props;

  const openArticleModal = () => {
    onClick(article);
  };

  return (
    <Flex
      className={classNames(
        "u-cursor--pointer",
        "t-border-r--md",
        "bg-white",
        "u-width--full u-padding--md",
        "t-elevation--10"
      )}
      onClick={openArticleModal}
      align="center"
      justify="space-around"
    >
      <Flex className="o-flex__item--no-shrink">
        <ArticleThumbnail {...article} />
      </Flex>
      <Flex
        direction="vertical"
        className="u-margin-left--md o-flex--1 u-width"
      >
        {article.subtitle && (
          <div className="u-font-sm text-grey-50">{article.subtitle}</div>
        )}
        <div className="u-font-weight-bold">{article.title}</div>
      </Flex>
    </Flex>
  );
};
