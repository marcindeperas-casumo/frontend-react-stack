export type TPromotionFields = {
  title: string;
  badge: string;
  dates: string;
  image: string;
  vertical: string;
  tag: string;
  teaser_text: string;
  teaser_caveats: string;
  cta_text: string;
  external_link?: string;
};

export type TPromotion = {
  slug: string;
  fields: TPromotionFields;
};

export type TFlattenedPromotion = TPromotionFields & Pick<TPromotion, "slug">;

export type TPromotionListContents = {
  list_title: string;
  promotions: TPromotion[];
};
