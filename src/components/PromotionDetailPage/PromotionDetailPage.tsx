import React from "react";
import cx from "classnames";
import { ComponentBuilder } from "Components/ComponentBuilder";

type TProps = {
  slug: string;
};

const ROOT_CLASSNAME = "c-promotion-detail";

export const PromotionDetailPage: React.FC<TProps> = ({
  slug,
  ...rest
}: TProps) => {
  return (
    <div className={cx(ROOT_CLASSNAME)}>
      <div
        className={cx(`${ROOT_CLASSNAME}__content`, "grid grid-cols-2 p-xlg")}
      >
        <ComponentBuilder slug={slug} />
      </div>
    </div>
  );
};
