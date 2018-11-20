// TODO: Make these components lazy-loaded
import DangerousHtml from "Components/DangerousHtml";
import CuratedCard from "Components/CuratedCard";
import Jackpots from "Components/Jackpots";
import GameListHorizontal from "Components/GameListHorizontal";
import ContentImage from "Components/ContentImage";
import ContentSeparator from "Components/ContentSeparator";
import ContentSubtitle from "Components/ContentSubtitle";
import ContentButton from "Components/ContentButton";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import PromotionCardList from "Components/PromotionCardList";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: DangerousHtml,
  GAMES_LIST: GameListHorizontal,
  CURATED_CARD: CuratedCard,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
  CONTENT_SEPARATOR: ContentSeparator,
  CONTENT_SUBTITLE: ContentSubtitle,
  CONTENT_BUTTON: ContentButton,
  PROMOTION_CARDS_HORIZONTAL: PromotionCardList,
  PROMOTION_CARDS_VERTICAL: PromotionCardTeaserList,
};
