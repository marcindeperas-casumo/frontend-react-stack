import React from "react";
import CudlModal from "@casumo/cmp-modal";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { ModalContentComponent } from "Components/RSModal";
import { isMobile } from "Components/ResponsiveLayout";
import { ArticleQuery } from "./Article.graphql";

export const ArticleModal = ({
  closeModal,
  config,
}: ModalContentComponent<{}>) => {
  const slug = config?.content?.slug;
  const { data, loading } = useQuery<A.ArticleQuery, A.ArticleQueryVariables>(
    ArticleQuery,
    {
      variables: {
        slug,
      },
    }
  );

  if (loading && !data) {
    return null;
  }

  const article = data.articlesList.articles[0];

  const featuredImage = (
    <ResponsiveImage
      src={article.image}
      dpr={2}
      imgixOpts={{
        fit: "crop",
        h: 150,
        q: 95,
        w: isMobile() ? 200 : 400,
      }}
      alt={article.title}
    />
  );

  return (
    <CudlModal
      className="u-width--full"
      bigTitle={article.title}
      closeIcon={{
        action: closeModal,
        className: "t-background-grey-20 t-border-r--circle u-padding--sm",
      }}
      featuredImage={featuredImage}
    >
      <div className="u-padding-y--md">
        <DangerousHtml html={article?.content} element="div" />
      </div>
    </CudlModal>
  );
};
