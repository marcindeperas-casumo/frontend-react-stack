// TODO: Make these components lazy-loaded
import ContentHtml from "Components/ContentHtml";
import CuratedCardLoader from "Components/CuratedCardLoader";
import Jackpots from "Components/Jackpots";
import MustDropJackpotsList from "Components/MustDropJackpotsList";
import GameListHorizontal from "Components/GameListHorizontal";
import GameListVertical from "Components/ContentGameList";
import ContentImage from "Components/ContentImage";
import ContentSeparator from "Components/ContentSeparator";
import ContentSubtitle from "Components/ContentSubtitle";
import ContentButton from "Components/ContentButton";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import PromotionCardList from "Components/PromotionCardList";
import PromotionGallery from "Components/PromotionGallery";
import ContentMediaList from "Components/ContentMediaList";
import PromotionHeaderImage from "Components/PromotionHeaderImage";
import PromotionTitle from "Components/PromotionTitle";
import PromotionPrizeTable from "Components/PromotionPrizeTable";
import ContentMustDropJackpotsWidget from "Components/ContentMustDropJackpotsWidget";
import TileListHorizontal from "Components/TileListHorizontal";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: ContentHtml,
  GAMES_LIST: GameListHorizontal,
  GAMES_LIST_HORIZONTAL: GameListHorizontal,
  GAMES_LIST_VERTICAL: GameListVertical,
  TILE_LIST_HORIZONTAL: TileListHorizontal,
  CURATED_CARD: CuratedCard,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
  CONTENT_SEPARATOR: ContentSeparator,
  CONTENT_SUBTITLE: ContentSubtitle,
  CTA: ContentButton,
  PROMOTION_CARDS_HORIZONTAL: PromotionCardList,
  PROMOTION_CARDS_VERTICAL: PromotionCardTeaserList,
  PROMOTION_CARDS_GALLERY: PromotionGallery,
  THUMBNAIL_LIST: ContentMediaList,
  PROMOTION_HEADER_IMAGE: PromotionHeaderImage,
  PROMOTION_TITLE: PromotionTitle,
  PROMOTION_CARD_TEASER_LIST: PromotionCardTeaserList,
  MUST_DROP_JACKPOTS: ContentMustDropJackpotsWidget,
  MUST_DROP_JACKPOTS_GAMES_LIST: MustDropJackpotsList,
  PRIZE_LIST: PromotionPrizeTable,
};
