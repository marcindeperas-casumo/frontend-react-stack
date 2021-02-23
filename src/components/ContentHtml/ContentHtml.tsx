// @flow
import * as React from "react";
import cx from "classnames";
import { MaximizeIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { ContentFader } from "./ContentFader";
import "./ContentHtml.scss";

type Props = {
  html: string,
  expandable?: boolean,
  onClickExpand?: () => void,
  className?: string,
  style?: string,
};

const defaultClasses = "s-content-html u-padding-x--lg";

export function ContentHtml({
  html,
  expandable = false,
  className,
  style = "",
  onClickExpand,
}: Props) {
  return (
    <div
      className={cx(
        "u-margin-bottom--2xlg",
        expandable && "o-position--relative"
      )}
    >
      <div
        className={cx(
          defaultClasses,
          className,
          expandable && "s-content-html--expandable u-overflow--auto",
          style && `s-content-html--${style}`
        )}
      >
        <DangerousHtml element="div" html={html} />
        {expandable && (
          <>
            <ContentFader to="top" />
            <ContentFader to="bottom" />
            <MaximizeIcon
              onClick={onClickExpand}
              className={cx(
                "o-position--absolute o-inset-bottom--none o-inset-right--none",
                "u-margin--md u-padding--sm t-border-r",
                "t-color-white t-background-grey-90 t-opacity-background--75",
                "u-cursor--pointer"
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
