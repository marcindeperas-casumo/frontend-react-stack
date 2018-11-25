// TODO: Make these components lazy-loaded
import ContentHtml from "Components/ContentHtml";
import CuratedCard from "Components/CuratedCard";
import Jackpots from "Components/Jackpots";
import GameListHorizontal from "Components/GameListHorizontal";
import GameListVertical from "Components/ContentGameList";
import ContentImage from "Components/ContentImage";
import ContentSeparator from "Components/ContentSeparator";
import ContentSubtitle from "Components/ContentSubtitle";
import ContentButton from "Components/ContentButton";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import PromotionCardList from "Components/PromotionCardList";
import ContentMediaList from "Components/ContentMediaList";
import PromotionHeaderImage from "Components/PromotionHeaderImage";
import PromotionTitle from "Components/PromotionTitle";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: ContentHtml,
  GAMES_LIST: GameListHorizontal,
  GAMES_LIST_HORIZONTAL: GameListHorizontal,
  GAMES_LIST_VERTICAL: GameListVertical,
  CURATED_CARD: CuratedCard,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
  CONTENT_SEPARATOR: ContentSeparator,
  CONTENT_SUBTITLE: ContentSubtitle,
  CONTENT_BUTTON: ContentButton,
  PROMOTION_CARDS_HORIZONTAL: PromotionCardList,
  PROMOTION_CARDS_VERTICAL: PromotionCardTeaserList,
  THUMBNAIL_LIST: ContentMediaList,
  PROMOTION_HEADER_IMAGE: PromotionHeaderImage,
  PROMOTION_TITLE: PromotionTitle,
};
