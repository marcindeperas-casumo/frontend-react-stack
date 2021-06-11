import React from "react";
import cx from "classnames";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { ContentHtml } from "Components/ContentHtml";

type TProps = {
  /** Promotion name */
  title: string;
  /** The Dates a promotion runs for */
  dates: string;
  /** Url of badge image on the left. */
  badge?: string;
  /** The tag text to show e.g. new, hot, featured  */
  tag?: string;
  /** The summary for the promotion. expect html  */
  summary?: string;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
};

const ROOT_CLASSNAME = "c-promotion-header";

const PromotionTitleText = ({ title, dates }: TProps) => (
  <>
    <Text tag="h1" size="lg" className="u-margin-bottom--sm font-bold">
      <DangerousHtml html={title} />
    </Text>
    <Text
      data-test="promotion-dates"
      size="2xs"
      className="text-purple-60 mb uppercase font-bold"
    >
      {dates}
    </Text>
  </>
);

const PromotionTitleTextWithBadge = ({ title, dates, badge }: TProps) => (
  <Media
    className="u-padding-x--lg u-margin-bottom--lg"
    renderText={() => <PromotionTitleText title={title} dates={dates} />}
    renderImage={() => (
      <img
        className="u-display--block"
        width={56}
        height={56}
        alt=""
        src={badge}
      />
    )}
  />
);

const PromotionHeader: React.FC<TProps> = ({
  title,
  dates,
  badge,
  tag,
  summary,
  gridColumnWidth,
}: TProps) => {
  return (
    <div
      className={cx(
        ROOT_CLASSNAME,
        gridColumnWidth && `col-span-${gridColumnWidth}`
      )}
    >
      {tag && (
        <Text tag="p" className="bg-purple-60 text-white uppercase">
          {tag}
        </Text>
      )}
      {badge ? (
        <PromotionTitleTextWithBadge
          title={title}
          dates={dates}
          badge={badge}
        />
      ) : (
        <div className="u-padding-x--lg u-margin-bottom--lg">
          <PromotionTitleText title={title} dates={dates} />
        </div>
      )}
      {summary && <ContentHtml html={summary}></ContentHtml>}
    </div>
  );
};

export default PromotionHeader;
