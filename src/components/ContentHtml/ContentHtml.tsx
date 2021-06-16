import { MaximizeIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import { ContentSubtitle } from "Components/ContentSubtitle";
import DangerousHtml from "Components/DangerousHtml";
import { ContentFader } from "./ContentFader";
import "./ContentHtml.scss";

type Props = {
  html: string;
  gridColumnWidth?: string;
  blockTitle?: string;
  expandable?: boolean;
  onClickExpand?: () => void;
  className?: string;
  style?: string;
};

const defaultClasses = "s-content-html px-lg";

export function ContentHtml({
  html,
  blockTitle,
  gridColumnWidth = "2",
  expandable = false,
  className,
  style = "",
  onClickExpand,
}: Props) {
  return (
    <div
      className={cx(
        "mb-2xlg",
        expandable && "relative",
        gridColumnWidth && `col-span-${gridColumnWidth}`
      )}
    >
      {blockTitle && (
        <ContentSubtitle
          className="font-bold"
          subtitle={blockTitle}
          gridColumnWidth={gridColumnWidth}
        ></ContentSubtitle>
      )}
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
                "text-white bg-grey-90 bg-opacity-75",
                "u-cursor--pointer"
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
