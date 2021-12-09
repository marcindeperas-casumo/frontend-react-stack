import type {
  TCurrencyCode,
  TJurisdiction,
  TLanguage,
  TMarket,
} from "Src/constants";

export type Tournaments = {
  [tournamentId: string]: {
    tournamentId: string;
    status: "Started" | "Scheduled";
    type: "Standard" | "Promoted";
    campaignId: string;
    contentId: "default";
    startTime: number;
    endTime: number;
    minBetByCurrency: {}; // not used?
    prizes: Array<{
      badgeRuleName: string;
      serializedItemUsables: Array<{
        usableClassName: "FreeMoneyUsableUsedEvent";
        usableJSON: "{}";
      }>; // always only 1 entry?
      templateParameterValues: {
        amountGiven: string; // ie. '{"amount":20.0000,"iso4217CurrencyCode":"EUR"}';
      };
    }>;
    gameConfiguration: {
      gamesAreInclusive: true;
      gameNames: Array<string>;
    };
    leaderboard: {
      [playerId: string]: {
        playerId: string;
        playerName: string;
        position: number;
        points: number;
        remainingSpins: number;
        mostPlayedGame: string | null;
        boosters: {
          winsInARow: number;
          triples: number;
          wins: number;
          bigWins: number;
          megaWins: number;
        };
      };
    };
    spinLimit: number;
    winner: null;
    numberOfParticipants: number;
    promoted: boolean;
  };
};

export type Handshake = {
  app: {
    "common/composition/session": {
      roles: Array<"player">;
      id: string;
      sessionId: string;
    };
    "common/ABTesting": {
      testSubjectId: string;
      features: Array<{
        name: string;
        flavour: string;
      }>;
    };
    "common/composition/piqConfig": {
      creditCardRsaCryptoPublicKeyAsHex: string;
      apiUrl: "/paymentiq/api/";
      merchantId: string;
    };
    "common/composition/mixPanel": {
      token: string;
    };
    "common/composition/googleTagManager": {
      containerId: "string";
    };
    target: "V2";
    "common/composition/context": {
      cometUrl: "/cometd/";
      siteUrl: string; // "https://www.casumotest.com";
      restrictionType: "UNAVAILABLE";
      unavailableCountries: Array<string>;
      jurisdiction: TJurisdiction;
      contextPath: "";
      traceEnabled: boolean;
      countryCodeByIp: string; // "__"
      crawl: boolean;
      marketCodeByIp: TMarket;
    };
    "common/composition/wpInterface": {
      rootContentHashes: Record<TLanguage, string>;
      marketHashes: Record<TMarket, Record<TLanguage, string>>;
      contentOverrides: {}; // ???
    };
    "common/composition/Adventure": {
      [n: string /* "0", "1" etc */]: Array<number>;
    };
    captchaSiteKey: string;
    captchaEnabled: boolean;
    clientIp: string;
    "common/composition/players": {
      players: {
        [playerId: string]: {
          playerId: string;
          casumoName: string;
          jurisdiction: TJurisdiction;
          wallet: {
            id: string;
            balance: {
              amount: number;
              iso4217CurrencyCode: TCurrencyCode;
            };
            depositsBlocked: boolean;
            withdrawalsBlocked: boolean;
          };
          contactInfo: {
            name: {
              firstName: string;
              lastName: string;
            };
            email: string;
            phoneNumber: {
              prefix: string;
              number: string;
            };
            socialSecurityNumber: string;
            dateOfBirth: number;
            gender: "MALE" | "FEMALE";
            primaryAddress: {
              country: TLanguage;
              addressLines: {
                zip: string;
                city: string;
                street: string;
              };
            };
            nationality: TLanguage;
            pendingEmailValidation: null;
          };
          configuration: {
            language: TLanguage;
            subscribedToNewsletters: boolean;
            subscribedToSMSNewsletters: boolean;
            adventurerPublic: boolean;
            emailOnlyAuthentication: boolean;
            contactByPhone: boolean;
            contactByPost: boolean;
            withdrawalNotifications: boolean;
          };
          referrerInfo: {
            referrer: null; // ???
            offerId: null; // ???
            targetCampaignId: null; // ???
            metadata: {}; // ???
          };
          registrationDate: number;
          firstDepositDate: number | null;
          bonus: null; // ???
          blocked: boolean;
          market: TMarket;
          notifications: Array<never>; // ???
          mandatoryMessages: Array<never>; // ???
          paymentMethods: Array<never>; // ???
          changePasswordTicketId: null; // ???
          welcomeOfferId: string; // "welcome-offer-undefined" as default?
          suspiciousAccount: boolean;
          failedLogins: number;
          latestPlayedGameIds: Array<string>;
          phoneNumberVerified: boolean;
          phoneNumberVerificationCodeRequestTimes: number;
          playerTournamentCampaign: {
            hasParticipatedInTournaments: boolean;
            tournaments: Tournaments;
          } | null;
          tournamentCampaign: {
            campaignId: "notUsed";
            gamesAreInclusive: boolean;
            gameNames: Array<never>;
            tournamentChannels: Array<string>;
            tournaments: Tournaments;
          } | null;
          featureFlags: Array<
            "AML_FLOW_17608" | "MOBILE_VERIFICATION" | "sports"
          >; // ???
          complianceState: {
            AML: {
              category: "AML"; // ???
              state: "TAGGED"; // ???
              playerBlockDate: number | null;
              depositBlockDate: number | null;
              withdrawalBlockDate: number | null;
            };
          };
          emailVerified: boolean;
          extentOfGambling: null; // ???
          testPlayer: boolean;
          authenticationMethods: {
            PASSWORD: boolean;
            SWEDISH_PNO: boolean;
            NEMID: boolean;
            TOKEN: boolean;
          };
          hasPlayerAcknowledgedLatestTAC: boolean;
          latestTACVersion: number;
          hasPlayerAcknowledgedLatestPrivacyPolicy: boolean;
          latestPrivacyPolicyVersion: number;
          lockedWithdrawalsEnabled: null; // ???
        };
      };
    };
  };
};
