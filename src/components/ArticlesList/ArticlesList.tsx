import classnames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";
import * as A from "Types/apollo";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { ArticleListRow } from "./ArticlesListRow";

import "./ArticlesList.scss";

type TProps = A.ArticlesListQuery & {
  title: string;
};

export const ArticlesList = ({ articlesList, title }: TProps) => {
  const dispatch = useDispatch();

  const onArticleClick = (article: A.Article): void => {
    dispatch(
      showModal(REACT_APP_MODAL.ID.ARTICLE_MODAL, {
        content: { slug: article.slug },
        isWide: true,
      })
    );
  };

  return (
    <div className={classnames("o-wrapper", topMarginClasses, xPaddingClasses)}>
      <ScrollableListTitleRow title={title} />
      <div className="c-articles-list">
        {articlesList.articles.map(article => (
          <ArticleListRow
            key={article.id}
            onClick={onArticleClick}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};
