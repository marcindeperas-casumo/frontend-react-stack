// TODO: Make these components lazy-loaded
import DangerousHtml from "Components/DangerousHtml";
import CuratedCard from "Components/CuratedCard";
import Jackpots from "Components/Jackpots";
import GameList from "Components/GameList";
import ContentImage from "Components/ContentImage";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: DangerousHtml,
  GAMES_LIST: GameList,
  CURATED_CARD: CuratedCard,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
};
