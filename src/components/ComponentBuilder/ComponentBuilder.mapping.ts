// TODO: Make these components lazy-loaded
import { GameLinkButton } from "Components/GameLinkButton";
import {
  DefaultCuratedCard,
  TopListCuratedCard,
} from "Components/CuratedCard/Variants";
import { ContentHtml } from "Components/ContentHtml";
import { Jackpots } from "Components/Jackpots";
import { MustDropJackpotsListContainer } from "Components/MustDropJackpotsList";
import { GameListHorizontalCMS } from "Components/GameListHorizontal/GameListHorizontalCMS";
import { ContentGameList as GameListVertical } from "Components/ContentGameList";
import { ContentImage } from "Components/ContentImage";
import { ContentSeparator } from "Components/ContentSeparator";
import { ContentSubtitle } from "Components/ContentSubtitle";
import { ContentButton } from "Components/ContentButton";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import { PromotionTeaserList } from "Components/PromotionTeaserList";
import PromotionCardListContainer from "Components/PromotionCardList/PromotionCardListContainer";
import { ContentMediaList } from "Components/ContentMediaList";
import PromotionHeaderImage from "Components/PromotionHeaderImage";
import PromotionHeader from "Components/PromotionHeader";
import PromotionPrizeTable from "Components/PromotionPrizeTable";
import { ContentMustDropJackpotsWidget } from "Components/ContentMustDropJackpotsWidget";
import { GameProvidersList } from "Components/GameProvidersList";
import { ReelRacesList } from "Components/ReelRacesList";
import PromotionOptInButton from "Components/PromotionOptInButton";
import {
  BlueRibbonChristmasContainer,
  BlueRibbonJackpotsWidgetPromotionPage,
  BlueRibbonJackpotsGameLists,
  BlueRibbonJackpotsStaticWidgetContainer,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";
import { PromotionalGameListsContainer } from "Components/PromotionalGameLists/GenericGameList";
import { ComponentBuilderDeposit } from "Components/Payments/Deposit";
import { ArticlesListContainer } from "Components/ArticlesList";

export const COMPONENT_MAPPING = {
  HTML_CONTENT: ContentHtml,
  GAMES_LIST: GameListHorizontalCMS,
  GAMES_LIST_HORIZONTAL: GameListHorizontalCMS,
  GAMES_LIST_VERTICAL: GameListVertical,
  GROUPED_LIST_HORIZONTAL: GameProvidersList,
  CURATED_CARD_DEFAULT: DefaultCuratedCard,
  CURATED_CARD_TOPLIST: TopListCuratedCard,
  CURATED_CARD: TopListCuratedCard,
  DEPOSIT_ROW: ComponentBuilderDeposit,
  JACKPOTS: Jackpots,
  CONTENT_IMAGE: ContentImage,
  CONTENT_SEPARATOR: ContentSeparator,
  ARTICLE_LIST_HORIZONTAL: ArticlesListContainer,
  CONTENT_SUBTITLE: ContentSubtitle,
  GAME_LINK: GameLinkButton,
  CTA: ContentButton,
  PROMOTION_OPT_IN_BUTTON: PromotionOptInButton,
  PROMOTIONS_LIST: PromotionCardListContainer,
  // PROMOTION_CARDS_VERTICAL is getting deprecated; use PROMOTION_LIST_VERTICAL instead
  PROMOTION_CARDS_VERTICAL: PromotionTeaserList,
  PROMOTION_LIST_VERTICAL: PromotionTeaserList,
  THUMBNAIL_LIST: ContentMediaList,
  PROMOTION_HEADER_IMAGE: PromotionHeaderImage,
  PROMOTION_HEADER: PromotionHeader,
  PROMOTION_CARD_TEASER_LIST: PromotionCardTeaserList,
  MUST_DROP_JACKPOTS: ContentMustDropJackpotsWidget,
  MUST_DROP_JACKPOTS_GAMES_LIST: MustDropJackpotsListContainer,
  PRIZE_LIST: PromotionPrizeTable,
  REEL_RACES: ReelRacesList,
  BLUE_RIBBON_XMAS: BlueRibbonChristmasContainer,
  CASUMO_BLIZZARD_JACKPOTS_WIDGET: BlueRibbonJackpotsWidgetPromotionPage,
  BLUE_RIBBON_JACKPOTS_GAME_LIST: BlueRibbonJackpotsGameLists,
  GENERIC_PROMOTIONAL_GAME_LIST: PromotionalGameListsContainer,
  LIVE_JACKPOTS: BlueRibbonJackpotsStaticWidgetContainer,
};
