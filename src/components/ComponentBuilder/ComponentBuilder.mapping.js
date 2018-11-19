// TODO: Make these components lazy-loaded
import DangerousHtml from "Components/DangerousHtml";
import CuratedCard from "Components/CuratedCard";
import Jackpots from "Components/Jackpots";
import GameList from "Components/GameList";
import ContentImage from "Components/ContentImage";
import ContentSeparator from "Components/ContentSeparator";
import ContentSubtitle from "Components/ContentSubtitle";
import ContentButton from "Components/ContentButton";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: DangerousHtml,
  GAMES_LIST: GameList,
  CURATED_CARD: CuratedCard,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
  CONTENT_SEPARATOR: ContentSeparator,
  CONTENT_SUBTITLE: ContentSubtitle,
  CONTENT_BUTTON: ContentButton,
};
