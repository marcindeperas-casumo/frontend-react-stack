export type CmsImageSizes = {
  "1536x1536": string;
  "1536x1536-height": number;
  "1536x1536-width": number;
  "2048x2048": string;
  "2048x2048-height": number;
  "2048x2048-width": number;
  large: string;
  "large-height": number;
  "large-width": number;
  medium: string;
  "medium-height": number;
  "medium-width": number;
  medium_large: string;
  "medium_large-height": number;
  "medium_large-width": number;
  "post-thumbnail": string;
  "post-thumbnail-height": number;
  "post-thumbnail-width": number;
  thumbnail: string;
  "thumbnail-height": number;
  "thumbnail-width": number;
  "twentytwenty-fullscreen": string;
  "twentytwenty-fullscreen-height": number;
  "twentytwenty-fullscreen-width": number;
};

export type CmsImage = {
  ID: number;
  alt: string;
  author: string;
  caption: string;
  date: string;
  description: string;
  filename: string;
  filesize: number;
  height: number;
  icon: string;
  id: number;
  link: string;
  menu_order: number;
  mime_type: string;
  modified: string;
  name: string;
  sizes: CmsImageSizes;
  status: string;
  subtype: string;
  title: string;
  type: string;
  uploaded_to: number;
  url: string;
  width: number;
};

export type SportsJackpotsTranslations = {
  background_desktop: CmsImage;
  background_mobile: CmsImage;
  background_tablet: CmsImage;
  description: string;
  enable_for_prod: boolean;
  enable_for_test: boolean;
  footer_tc_link: string;
  footer_tc_text: string;
  footer_text: string;
  last_day: string;
  match_drop: string;
  mega_drop: string;
  modal_conditions: string;
  modal_content: string;
  modal_cta: string;
  modal_footer: string;
  modal_title: string;
  more_info: string;
  potid_match: string;
  potid_mega: string;
  title: string;
  view_odds: string;
  view_odds_link: string;
  won: string;
};
