import AdventurerMock from "Components/AdventureCard/__mocks__/Adventure.json";

const now = Date.now();
const THIRTY_MINUTES = 30 * 60 * 1000;
export const getStateMock = ({ firstDepositDate = null } = {}) => ({
  router: {
    activeComponents: ["games-top"],
  },
  fetch: {
    "HANDSHAKE/FETCH_APP_HANDSHAKE": {
      error: null,
      isFetching: false,
    },
    "HANDSHAKE/FETCH_GAMES_HANDSHAKE": {
      error: null,
      isFetching: false,
    },
    "GAMES/FETCH_TOP_LISTS_START": {
      error: null,
      isFetching: false,
    },
    "CMS/FETCH_PAGE_BY_SLUG-curated.curated-se_sv": {
      error: null,
      isFetching: false,
    },
    "CMS/FETCH_PAGE_BY_SLUG-mobile.live-casino-cards-content": {
      error: null,
      isFetching: false,
    },
    "JACKPOTS_MUST_DROP/FETCH": {
      error: null,
      isFetching: false,
    },
  },
  handshake: {
    app: {
      "common/composition/context": {
        cometUrl: "/cometd/",
        siteUrl: "https://www.casumotest.com/",
        restrictionType: "UNAVAILABLE",
        unavailableCountries: [
          "tm",
          "kr",
          "il",
          "eg",
          "gu",
          "it",
          "be",
          "mm",
          "ag",
          "tw",
          "la",
          "gm",
          "sn",
          "ph",
          "vi",
          "vu",
          "mq",
          "id",
          "mk",
          "hk",
          "hm",
          "cx",
          "sg",
          "ma",
          "aq",
          "cc",
          "pf",
          "mf",
          "gl",
          "pr",
          "tf",
          "gy",
          "gh",
          "uz",
          "bl",
          "va",
          "tj",
          "ss",
          "__",
          "ug",
          "gp",
          "lr",
          "kp",
          "cm",
          "bv",
          "ps",
          "ng",
          "lt",
          "ee",
          "tr",
          "as",
          "sk",
          "lk",
          "fo",
          "me",
          "so",
          "ro",
          "ad",
          "pw",
          "tn",
          "es",
          "si",
          "iq",
          "cy",
          "zw",
          "cd",
          "al",
          "ne",
          "ao",
          "gr",
          "cf",
          "ci",
          "ly",
          "nf",
          "fr",
          "au",
          "sl",
          "vg",
          "yt",
          "md",
          "gf",
          "us",
          "re",
          "sy",
          "er",
          "pt",
          "eh",
          "sd",
          "rs",
          "mp",
          "wf",
          "cn",
          "um",
          "pk",
          "jp",
          "dz",
          "qa",
          "cz",
          "pm",
          "ir",
          "hu",
          "mo",
          "nc",
          "af",
          "ae",
          "at",
          "ye",
        ],
        jurisdiction: "MGA",
        contextPath: "",
        mobileUrl: "https://m.casumotest.com/",
        traceEnabled: false,
        countryCodeByIp: "__",
        crawl: false,
      },
      "common/composition/wpInterface": {
        rootContentHashes: {
          de: "98d294d12595e77657912b8a8ed6f955",
          no: "237ad922ad31580881dbde30e1207d96",
          fi: "f47fca2b6c8b2177ad81ba31be95a2ac",
          sv: "3e1fa806fdd766dcf470b8b69cff98b1",
          dk: "f26c8b8071540a1fc7ccd883952a95d1",
          en: "c22973a240e540a28011ef401e5146bc",
          gb: "5899f873666807d49078629b5c58ca81",
          ca: "abc6754d9971ae59a735214fea87a163",
        },
        marketHashes: {
          fi_fi: {
            fi: "c92d06936215d84169a91f601530783d",
          },
          se_sv: {
            sv: "f61914cb4732bde680359b5b2896dc30",
          },
          gb_en: {
            gb: "8dec95ee3d970e306ebd62053e90ae7c",
          },
          dk_da: {
            dk: "398992187a982f426c117b369a54680e",
          },
          ca_en: {
            ca: "45edd335211995795b9034ebb35f954a",
          },
          no_no: {
            no: "86a80d66c51455b68baf8705e03684a8",
          },
          ___en: {
            en: "56426bd47578324028828dce71a2e2a6",
          },
          de_de: {
            de: "760d0c7d22c9f212c5db63aaafac7dd3",
          },
        },
        contentOverrides: {},
      },
      "common/composition/session": {
        roles: ["player"],
        id: "2bb42ab0-7937-11e8-b6b5-0242ac11000b",
        sessionId: "1519125a-da05-4f6f-8485-de3983bf176d",
      },
      "common/ABTesting": {
        testSubjectId: "79e686cc-8e51-41e4-991f-dc0da0b526ad",
        features: [
          {
            name: "mobile-deposit-type-amount-button",
            flavour: "default",
          },
          {
            name: "desktop-new-game-browser-main-nav-button",
            flavour: "default",
          },
          {
            name: "mobile-registration-country-step",
            flavour: "default",
          },
          {
            name: "mobile-welcome-offer-copy",
            flavour: "variation-c",
          },
          {
            name: "iframe-registration",
            flavour: "iframe",
          },
          {
            name: "desktop-start-page-banner-image",
            flavour: "default",
          },
          {
            name: "mobile-stack-poc",
            flavour: "default",
          },
          {
            name: "mobile-signup-contextual-help",
            flavour: "new-version",
          },
          {
            name: "levi-test-2",
            flavour: "default",
          },
          {
            name: "is-react-stack-visible",
            flavour: "default",
          },
          {
            name: "desktop-signup-contextual-help",
            flavour: "default",
          },
          {
            name: "registration-flow-started",
            flavour: "default",
          },
          {
            name: "mobile-stack",
            flavour: "default",
          },
          {
            name: "mobile-new-game-browser-main-nav-button",
            flavour: "default",
          },
          {
            name: "uk-header-template-test2",
            flavour: "default",
          },
          {
            name: "mobile-start-page-banner-image",
            flavour: "space",
          },
          {
            name: "iframe-registration-2",
            flavour: "default",
          },
          {
            name: "mobile-registration-fields",
            flavour: "default",
          },
          {
            name: "mobile-deposit-cta",
            flavour: "new-version",
          },
          {
            name: "deposit-now",
            flavour: "default",
          },
        ],
      },
      "common/composition/Adventure": {
        "0": [
          115,
          205,
          340,
          550,
          895,
          1345,
          2000,
          2850,
          3970,
          5315,
          6899,
          8800,
          11081,
          13818,
          17102,
          21044,
          25774,
          31450,
          38260,
          46434,
        ],
        "1": [
          115,
          205,
          340,
          502,
          696,
          930,
          1210,
          1546,
          1949,
          2432,
          3013,
          3709,
          4545,
          5548,
          6752,
          8196,
          9930,
          12010,
          14506,
          17501,
        ],
      },
      "common/composition/piqConfig": {
        creditCardRsaCryptoPublicKeyAsHex:
          "30820122300d06092a864886f70d01010105000382010f003082010a02820101009596d11ce894ec98f3b5d9f022a6ad7f9068d20eaa8baff973dad8b004d0199de3e6c27ea94d935e4f7af6e1001627ef5d30277f4486a25cf213f5e5d9f84763088431dc9fe2ab2560ef8353285c4b681ffd6dec813c6edb288d639eac2887fc944ae1dd79d83bb899d19870fccc1cfbd1a2900aa1f9ef06c218c6e123b6cd94ed4e77ed1fd286808968adbb8559dd24910ae6fe6c77eb8618bc2d645d4a89ec0a033220daf36db4e58b045decfa584d8deccd5a89ae4c87747297b6faea164e792f78c45972e8baaf44e4997b72c6bdd159c4c93fff817daa31221b9c46bab7e67e1b8226c46cb23e1662b834a5eee1219d9c35a9d4878b596cb5b34db21d0f0203010001",
        apiUrl: "/paymentiq/api/",
        merchantId: "100044999",
      },
      captchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      "common/composition/mixPanel": {
        token: "3cdfbb1f5c40a7bc9573f87687bf77f2",
      },
      "common/composition/googleTagManager": {
        containerId: "GTM-LWZ6",
      },
      captchaEnabled: true,
      clientIp: "127.0.0.1",
      "common/composition/players": {
        players: {
          "2bb42ab0-7937-11e8-b6b5-0242ac11000b": {
            playerId: "2bb42ab0-7937-11e8-b6b5-0242ac11000b",
            casumoName: "chosv",
            jurisdiction: "MGA",
            wallet: {
              id: "2d9dd240-7937-11e8-b6b5-0242ac11000b",
              balance: {
                amount: 0,
                iso4217CurrencyCode: "EUR",
              },
              depositsBlocked: false,
              withdrawalsBlocked: false,
            },
            contactInfo: {
              name: {
                firstName: "cho",
                lastName: "garcia",
              },
              email: "cho.garcia+sv@casumo.com",
              phoneNumber: {
                prefix: "+46",
                number: "78851946679",
              },
              socialSecurityNumber: "",
              dateOfBirth: 532738800000,
              gender: "MALE",
              primaryAddress: {
                country: "se",
                addressLines: {
                  zip: "23740",
                  city: "La Linea",
                  street: "lacalle",
                },
              },
              nationality: null,
              pendingEmailValidation: null,
            },
            configuration: {
              language: "en",
              subscribedToNewsletters: true,
              adventurerPublic: true,
              emailOnlyAuthentication: false,
              contactByPhone: true,
              contactByPost: true,
              withdrawalNotifications: false,
              subscribedToSMSNewsletters: true,
            },
            referrerInfo: {
              offerId: "no-offer-id",
              targetCampaignId: null,
              metadata: {
                source: "https://site.dev/",
              },
              referrer: "SEO",
            },
            registrationDate: 1530013853000,
            firstDepositDate,
            bonus: null,
            blocked: false,
            market: "gb_en",
            activeDepositBonus: null,
            notifications: [],
            mandatoryMessages: [],
            paymentMethods: [],
            changePasswordTicketId: null,
            welcomeOfferId: "welcome-1200-ladder-offer",
            suspiciousAccount: false,
            failedLogins: 0,
            latestPlayedGameIds: [],
            phoneNumberVerified: false,
            phoneNumberVerificationCodeRequestTimes: 0,
            playerTournamentCampaign: {
              hasParticipatedInTournaments: false,
              tournaments: {},
            },
            tournamentCampaign: {
              campaignId: "notUsed",
              tournaments: {
                "bffa8ce0-dcc0-11e8-b475-0242ac110004": {
                  tournamentId: "bffa8ce0-dcc0-11e8-b475-0242ac110004",
                  status: "Started",
                  type: "Standard",
                  campaignId: "mfd_high_activity",
                  contentId: "default",
                  startTime: 1541613600000,
                  endTime: 1541614800000,
                  minBetByCurrency: {
                    EUR: 0.4,
                    GBP: 0.4,
                    CAD: 0.8,
                    DKK: 4,
                    SEK: 4,
                  },
                  prizes: [
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_150|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "150",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "150",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_100|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "100",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "100",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_75|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "75",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "75",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_50|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "50",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "50",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_50|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "50",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "50",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_mega_fortune_dreams_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[netent-megafortunedreams_not_mobile_sw]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                  ],
                  gameConfiguration: {
                    gamesAreInclusive: true,
                    gameNames: [
                      "netent-megafortunedreams_mobile_html_sw",
                      "netent-megafortunedreams_not_mobile_sw",
                    ],
                  },
                  leaderboard: {},
                  spinLimit: 160,
                  winner: null,
                  numberOfParticipants: 0,
                  promoted: false,
                },
                "c0053b40-dcc0-11e8-b475-0242ac110004": {
                  tournamentId: "c0053b40-dcc0-11e8-b475-0242ac110004",
                  status: "Scheduled",
                  type: "Standard",
                  campaignId: "book_of_dead_high_activity_superflip_fs",
                  contentId: "default",
                  startTime: 1541615400000,
                  endTime: 1541616600000,
                  minBetByCurrency: {
                    EUR: 0.4,
                    GBP: 0.4,
                    CAD: 0.8,
                    DKK: 4,
                    SEK: 4,
                  },
                  prizes: [
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_150|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "150",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "150",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_100|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "100",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "100",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_75|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "75",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "75",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_50|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "50",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "50",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_50|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "50",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "50",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_25|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "25",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "25",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_10|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "10",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "10",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_super-flip_020_5|slug=free-spins-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeSpinsUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        iconSuffix: "5",
                        gameName: "[[playngo-superflip]]",
                        nrOfFreeSpins: "5",
                        freeSpinValue: "20",
                      },
                    },
                  ],
                  gameConfiguration: {
                    gamesAreInclusive: true,
                    gameNames: [
                      "playngo-bookofdead",
                      "playngo-bookofdeadmobile",
                    ],
                  },
                  leaderboard: {},
                  spinLimit: 210,
                  winner: null,
                  numberOfParticipants: 0,
                  promoted: false,
                },
                "c00e3bf0-dcc0-11e8-b475-0242ac110004": {
                  tournamentId: "c00e3bf0-dcc0-11e8-b475-0242ac110004",
                  status: "Scheduled",
                  type: "Promoted",
                  campaignId: "casumo_promoted_bookofdead",
                  contentId: "default",
                  startTime: 1541617200000,
                  endTime: 1541620200000,
                  minBetByCurrency: {
                    EUR: 0.4,
                    GBP: 0.4,
                    CAD: 0.8,
                    DKK: 4,
                    SEK: 4,
                  },
                  prizes: [
                    {
                      badgeRuleName:
                        "tournament_1000_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":1000.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_250_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":250.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_100_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":100.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_50_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":50.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_50_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":50.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_25_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":25.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_25_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":25.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_25_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":25.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_25_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":25.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_25_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":25.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_10_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":10.0000,"iso4217CurrencyCode":"EUR"}',
                      },
                    },
                  ],
                  gameConfiguration: {
                    gamesAreInclusive: true,
                    gameNames: [
                      "playngo-bookofdead",
                      "playngo-bookofdeadmobile",
                    ],
                  },
                  leaderboard: {
                    "f2d7df50-4a21-11e8-8ca4-0242ac11000d": {
                      playerId: "f2d7df50-4a21-11e8-8ca4-0242ac11000d",
                      playerName: "CheezDoodles",
                      position: 1,
                      points: 0,
                      remainingSpins: 525,
                      mostPlayedGame: null,
                      boosters: {
                        winsInARow: 0,
                        triples: 0,
                        wins: 0,
                        bigWins: 0,
                        megaWins: 0,
                      },
                    },
                  },
                  spinLimit: 525,
                  winner: null,
                  numberOfParticipants: 1,
                  promoted: true,
                },
              },
              gamesAreInclusive: true,
              gameNames: [
                "relax-stickybandits",
                "playngo-trollhunters",
                "netent-fruitshop_not_mobile_sw",
                "netent-twinspin_not_mobile_sw",
                "netent-flowers_not_mobile_sw",
                "netent-colossalpinatas_sw",
                "netent-colossalpinatas_mobile_html_sw",
                "microgaming-MGS_MermaidsMillions",
                "microgaming-MGS_HTML5_Slot_Carnaval",
                "playngo-hugotwomobile",
                "relax-winsoffortune",
                "relax-dragonshrine",
                "wms-wipeout",
                "netent-magicportals_sw",
                "netent-secretofthestones_sw",
                "netent-magicportals_mobile_html_sw",
                "netent-jimihendrix_mobile_html_sw",
                "netent-jimihendrix_not_mobile_sw",
                "microgaming-MGS_HTML5_Slot_EaglesWings",
                "gt-power_joker",
                "wms-montysmillions",
                "playngo-mysteryjoker6000mobile",
                "playngo-aztecwarriorprincess",
                "microgaming-MGS_SixAcrobats",
                "netent-silentrun_sw",
                "rgs-golden_egypt",
                "netent-motorhead_not_mobile_sw",
                "microgaming-MGS_Eagles_Wings",
                "netent-pota_mobile_html_sw",
                "wms-vegashits",
                "netent-cosmicfortune_sw",
                "netent-warlords_mobile_html_sw",
                "wms-doublebuffalospirit",
                "wms-actionbank",
                "nyx-platinum_pyramide",
                "nyx-ho_ho_tower",
                "gt-magic_princess",
                "relax-volcanoriches",
                "netent-koiprincess_not_mobile_sw",
                "netent-koiprincess_mobile_html_sw",
                "playngo-trollhuntersmobile",
                "nyx-danger_high_voltage",
                "wms-elvis_gls",
                "wms-ladyrobinhood",
                "microgaming-MGS_TombRaider",
                "netent-junglespirit_not_mobile_sw",
                "tk-barbershop",
                "tk-berzerker",
                "tk-uncharted",
                "tk-tokitime",
                "wms-quickhitplatinumb7",
                "playngo-energoonz",
                "playngo-energoonzmobile",
                "netent-piggyriches_mobile_html_sw",
                "netent-lostisland_sw",
                "netent-jokerpro_not_mobile_sw",
                "playngo-jademagicianmobile",
                "netent-deadoralive_not_mobile_sw",
                "nyx-silver_lion",
                "playngo-Imperialopera",
                "wms-ladyofegypt",
                "netent-fisticuffs_sw",
                "netent-discospins_mobile_html_sw",
                "nyx-wild_run",
                "nyx-fat_cat",
                "nyx-electric_sam",
                "netent-megafortune_not_mobile_sw",
                "netent-wildwater_sw",
                "wms-wishingyoufortune_gls",
                "playngo-aztecwarriorprincessmobile",
                "wms-wishingyoufortune",
                "microgaming-MGS_HTML5_FeatureSlot_BreakAway",
                "playngo-enchantedmeadowmobile",
                "microgaming-MGS_HTML5_SixAcrobats",
                "nyx-thai_sunrise",
                "rgs-family_guy",
                "rgs-sherlock_holmes_the_hunt_for_blackwood",
                "playngo-reactoonz",
                "netent-kingofslots_sw",
                "netent-kingofslots_mobile_html_sw",
                "rgs-king_of_macedonia",
                "netent-reelrush_sw",
                "netent-dazzle_mobile_html_sw",
                "netent-dazzle_not_mobile_sw",
                "rgs-baywatch",
                "netent-megafortune_mobile_html_sw",
                "netent-blacklagoon_sw",
                "ygg-sunny_shores",
                "nyx-route_777",
                "playngo-enchantedcrystalsmobile",
                "playngo-planetfortune",
                "tk-birds-a",
                "tk-esqueleto-a",
                "tk-magicians-a",
                "netent-junglespirit_mobile_html_sw",
                "nyx-sam_on_the_beach",
                "rgs-elephant_king",
                "nyx-dragon_born",
                "relax-polar_picnic",
                "netent-elements_mobile_html_sw",
                "wms-eightyeightfortunes",
                "netent-multipliermayhem_mobile_html_sw",
                "netent-multipliermayhem_not_mobile_sw",
                "netent-emoji_mobile_html_sw",
                "nyx-red_roo",
                "playngo-mysteryjokermobile",
                "rgs-toki_doki_lucky_town",
                "playngo-Imperialoperamobile",
                "netent-bloodsuckers_not_mobile_sw",
                "netent-wildwildwest_not_mobile_sw",
                "netent-jokerpro_mobile_html_sw",
                "gt-book_of_ra_deluxe_jackpot_edition",
                "tk-the_falcon_huntress",
                "playngo-reactoonzmobile",
                "netent-whenpigsfly_sw",
                "netent-whenpigsfly_mobile_html_sw",
                "nyx-bonanza",
                "playngo-moonprincess",
                "gt-john_doe",
                "microgaming-MGS_MegaMoolah",
                "nyx-dolphin_gold",
                "nyx-hidden",
                "nyx-funky_chicken",
                "netent-elements_not_mobile_sw",
                "netent-fairyhansel_not_mobile_sw",
                "playngo-planetfortunemobile",
                "netent-fairyred_mobile_html_sw",
                "ygg-ozwins_jackpots",
                "netent-emoji_not_mobile_sw",
                "gt-the_real_king_aloha_hawaii_94",
                "microgaming-MGS_108Heroes",
                "netent-subtopia_mobile_html_sw",
                "netent-elements_sw",
                "netent-mythicmaiden_mobile_html_sw",
                "netent-discospins_sw",
                "tk-luchadora",
                "netent-arabian_sw",
                "tk-full_moon_romance",
                "ygg-valley_of_the_gods",
                "ygg-easter_island",
                "wms-fudaole",
                "tk-s1-g8",
                "relax-3_elements",
                "tk-s1-g3",
                "relax-mr_illusio",
                "wms-thaiflower",
                "microgaming-MGS_Break_Away",
                "gt-midnight_rush",
                "netent-wildwildwest_mobile_html_sw",
                "relax-smile",
                "playngo-moonprincessmobile",
                "wms-monopolymegamovers",
                "tk-barber_shop_uncut",
                "wms-wkkr",
                "tk-babushka",
                "tk-spectra",
                "rgs-fire_horse",
                "nyx-the_lab",
                "netent-wildturkey_sw",
                "wms-epicmonopoly2",
                "edict-bluep_lotifortunespins",
                "netent-fairyred_not_mobile_sw",
                "nyx-cleos_wish",
                "relax-witchcraft",
                "rgs-wheel_of_fortune_ultra_5_reels",
                "rgs-candybars",
                "rgs-silent_movie",
                "rgs-triple_red_hot_7s_free_games",
                "microgaming-MGS_HTML5_108Heroes",
                "microgaming-MGS_HTML5_Slot_TombRaider",
                "gt-jewel_action",
                "gt-clockwork_oranges",
                "wms-luckytree",
                "rgs-the_wild_life",
                "nyx-dolphin_gold_stellar_jackpots",
                "gt-music_island",
                "ygg-reef_run",
                "tk-flame_busters",
                "gt-dreams_and_dollars",
                "relax-power_force_heroes",
                "playngo-christmasjoker",
                "wms-omgkittens",
                "playngo-christmasjokermobile",
                "wms-omgkittens_gls",
                "netent-masterofmystery_sw",
                "netent-masterofmystery_mobile_html_sw",
                "netent-fruitshop_mobile_html_sw",
                "netent-starburst_mobile_html_sw",
                "netent-muse_sw",
                "netent-jackhammer2_mobile_html_sw",
                "relax-spinions",
                "playngo-leprechaungoestohell",
                "relax-fairygate",
                "playngo-fuerdai",
                "wms-spartacuscta",
                "relax-goldlab",
                "relax-icebreaker",
                "relax-phoenixsun",
                "nyx-poltava",
                "microgaming-MGS_HTML5_Slot_MermaidsMillions",
                "nyx-champions_goal",
                "microgaming-MGS_ForbiddenThrone",
                "playngo-mermaidsdiamond",
                "nyx-serengeti_lions",
                "tk-starvector",
                "relax-just_a_game",
                "nyx-jackpotjester50k",
                "wms-cluespinningdetectives",
                "wms-cooljewels_gls",
                "nyx-dragon_wins",
                "microgaming-MGS_ElectricDiva",
                "netent-bloodsuckers2_not_mobile_sw",
                "nyx-golden_mane",
                "relax-goldilocks2",
                "netent-reelrush_mobile_html_sw",
                "wms-zeus1000",
                "wms-zeus1000_gls",
                "nyx-reels_of_fortune_triple_pay",
                "microgaming-MGS_108HeroesMultiplierFortunes",
                "tk-not_enough_kittens",
                "gt-bank_or_prank",
                "rgs-balloonies",
                "wms-dancinginrio",
                "netent-attraction_sw",
                "netent-bloodsuckers_mobile_html_sw",
                "relax-fruit_o_matic",
                "ygg-orient_express",
                "netent-wildrockets_sw",
                "netent-dracula_sw",
                "netent-dracula_mobile_html_sw",
                "nyx-temple_quest_spinfinity",
                "playngo-hugo",
                "playngo-mermaidsdiamondmobile",
                "relax-sinbad",
                "netent-bloodsuckers2_mobile_html_sw",
                "netent-neonstaxx_mobile_html_sw",
                "netent-neonstaxx_not_mobile_sw",
                "relax-sugartrail",
                "playngo-leprechaungoestohellmobile",
                "gt-queen_cleopatra",
                "relax-colossus",
                "relax-sevens",
                "relax-treasureisland",
                "rgs-miss_white",
                "rgs-prowling_panther",
                "rgs-lil_lady",
                "rgs-ghostbusters_triple_slime",
                "rgs-wolf_run",
                "rgs-grand_monarch",
                "rgs-siberian_storm",
                "rgs-treasures_of_troy",
                "rgs-dungeons_and_dragons__crystal_caverns",
                "rgs-100000_pyramid",
                "rgs-kitty_glitter",
                "rgs-western_belles",
                "rgs-transformers_battle_for_cybertron",
                "rgs-wheel_of_fortune_triple_extreme_spin",
                "rgs-double_diamond",
                "rgs-rich_girl",
                "rgs-crown_of_egypt",
                "rgs-bubble_craze",
                "rgs-black_widow",
                "netent-fairyhansel_mobile_html_sw",
                "wms-zeus3_prt",
                "relax-crystalqueen",
                "nyx-jade_idol",
                "netent-megafortunedreams_sw",
                "netent-warlords_not_mobile_sw",
                "playngo-fuerdaimobile",
                "wms-woz_road_to_emerald_city",
                "microgaming-MGS_HTML5_MegaMoolah",
                "relax-rapunzel2",
                "netent-southpark_mobile_html_sw",
                "netent-southpark_sw",
                "playngo-matsuri",
                "netent-jackandbeanstalk_not_mobile_sw",
                "netent-phantomoftheopera_not_mobile_sw",
                "playngo-spinparty",
                "playngo-spinpartymobile",
                "netent-highlights_not_mobile_sw",
                "netent-piggyriches_not_mobile_sw",
                "nyx-panda_pow",
                "rgs-icy_wilds",
                "relax-mightyarthur",
                "nyx-wish_upon_a_jackpot",
                "playngo-sevensinsmobile",
                "playngo-aztecprincess",
                "nyx-king_kong_fury",
                "microgaming-MGS_HTML5_108HeroesMultiplierFortunes",
                "relax-oceans_secret",
                "netent-sparks_not_mobile_sw",
                "netent-sparks_mobile_html_sw",
                "netent-deadoralive_mobile_html_sw",
                "microgaming-MGS_Shoot",
                "wms-ragingrhino_prt",
                "relax-bbw",
                "relax-firestorm",
                "relax-royalfrog",
                "relax-journey",
                "relax-jewelblast",
                "relax-musketeers",
                "relax-titans",
                "relax-illuminous",
                "microgaming-MGS_BridesMaids",
                "wms-rainbowrichesfreespins",
                "netent-highlights_mobile_html_sw",
                "microgaming-MGS_FootballStar_FeatureSlot",
                "rgs-1421_voyages_of_zhenghe",
                "microgaming-MGS_HTML5_FootballStar_FeatureSlot",
                "gt-ultra_fruits",
                "netent-shangrila_not_mobile_sw",
                "netent-colossalpinatas_not_mobile_sw",
                "nyx-five_pirates",
                "microgaming-MGS_Ariana_Flash",
                "tk-bork_the_berzerker",
                "nyx-samurai_split",
                "microgaming-MGS_HTML5_FeatureSlot_Ariana",
                "microgaming-MGS_TwistedCircus",
                "microgaming-MGS_Halloween",
                "microgaming-MGS_HTML5_BonusSlot_TheTwistedCircus",
                "playngo-goldenticket",
                "playngo-goldenticketmobile",
                "gt-book_of_ra_deluxe_bingo",
                "nyx-cool_bananas",
                "edict-bluep_topcat",
                "nyx-star_quest",
                "rgs-thebigeasy",
                "netent-southpark2_mobile_html_sw",
                "netent-southpark2_sw",
                "relax-dragonsisters",
                "wms-mjkingofpop",
                "netent-scruffyduck_not_mobile_sw",
                "netent-fruitshopchristmas_not_mobile_sw",
                "netent-flowerschristmas_not_mobile_sw",
                "netent-flowerschristmas_mobile_html_sw",
                "netent-fruitshopchristmas_mobile_html_sw",
                "playngo-turkishvillagekid",
                "playngo-wildnorth",
                "wms-heidisbierhaus",
                "ygg-pumpkin_smash",
                "wms-cheshirecat",
                "relax-hotsync",
                "edict-bluep_superspinner",
                "tk-fruittime",
                "playngo-wizardofgems",
                "wms-wackyraces",
                "netent-butterflystaxx_mobile_html_sw",
                "ygg-gem_rocks",
                "microgaming-MGS_Mystic_Dreams",
                "ygg-reptoids",
                "microgaming-MGS_HTML5_FeatureSlot_MysticDreams",
                "microgaming-MGS_PollenParty",
                "netent-megafortunedreams_mobile_html_sw",
                "rgs-shamrockers",
                "netent-fireflies_mobile_html_sw",
                "netent-fireflies_sw",
                "wms-frozeninferno",
                "tk-icecream",
                "wms-oncearounddeluxe_gls",
                "netent-thief_sw",
                "wms-oncearounddeluxe",
                "netent-monkeys_sw",
                "microgaming-MGS_DecktheHalls",
                "playngo-wildnorthmobile",
                "netent-motorhead_mobile_html_sw",
                "wms-wozemeraldcity",
                "wms-cashspin",
                "wms-cashwizard",
                "netent-spacewars_sw",
                "netent-luckyangler_mobile_html_sw",
                "microgaming-MGS_HTML5_DeckTheHalls",
                "playngo-matsurimobile",
                "microgaming-MGS_HTML5_Halloween",
                "netent-scruffyduck_mobile_html_sw",
                "wms-rocketreturns",
                "edict-bluep_slotsogold",
                "playngo-wizardofgemsmobile",
                "playngo-turkishvillagekidmobile",
                "nyx-gold",
                "wms-hotfruitastic",
                "netent-megafortunedreams_not_mobile_sw",
                "wms-cdskooza",
                "nyx-moon_temple",
                "playngo-goldking",
                "netent-themepark_not_mobile_sw",
                "netent-rabbits_sw",
                "netent-themepark_mobile_html_sw",
                "netent-copycats_mobile_html_sw",
                "rgs-golden_goddess",
                "rgs-cleopatra",
                "rgs-da_vinci_diamonds",
                "rgs-cats",
                "rgs-pharaohs_fortune",
                "rgs-pixies_of_the_forest",
                "gt-wild_christmas",
                "netent-godsoffortune_mobile_html_sw",
                "netent-copycats_not_mobile_sw",
                "netent-aloha_not_mobile_sw",
                "netent-aloha_mobile_html_sw",
                "ygg-jokerizer",
                "ygg-winterberries",
                "microgaming-MGS_JurassicWorld",
                "ygg-casino_zeppelin",
                "netent-phantomoftheopera_mobile_html_sw",
                "netent-godsoffortune_not_mobile_sw",
                "ygg-joker_millions",
                "ygg-chibeasties",
                "netent-football_mobile_html_sw",
                "ygg-vikings_go_wild",
                "rgs-treasures_of_the_pyramids",
                "ygg-holmes_stolen_stones",
                "ygg-doubles",
                "netent-asgardianstones_mobile_html_sw",
                "ygg-nirvana",
                "ygg-incinerator",
                "netent-victorious_not_mobile_sw",
                "nyx-jungle_jackpots",
                "ygg-wicked_circus",
                "gt-big_catch",
                "gt-party_games_slotto",
                "ygg-seasons",
                "ygg-empire_fortune",
                "gt-extreme",
                "ygg-legend_golden_monkey",
                "ygg-bicicleta",
                "ygg-legend_white_snake_lady",
                "ygg-big_blox",
                "rgs-gypsymoon",
                "ygg-double_dragons",
                "playngo-bigwincat",
                "ygg-super_heroes",
                "ygg-vikings_go_berzerk",
                "netent-tornado_sw",
                "netent-tornado_mobile_html_sw",
                "ygg-chibeasties_2",
                "netent-hotline_mobile_html_sw",
                "netent-wolfcub_not_mobile_sw",
                "netent-secretsofchristmas_not_mobile_sw",
                "netent-wizards_sw",
                "netent-beach_sw",
                "netent-boombrothers_sw",
                "netent-victorious_mobile_html_sw",
                "netent-jackhammer_mobile_html_sw",
                "netent-luckyeight_sw",
                "netent-demolitionsquad_sw",
                "netent-retro-super80_sw",
                "netent-secretcode_sw",
                "netent-reelsteal_sw",
                "netent-jackhammer2_sw",
                "netent-subtopia_sw",
                "netent-junglegames_sw",
                "netent-egyptianheroes_sw",
                "netent-flowers_mobile_html_sw",
                "netent-dragonisland_sw",
                "netent-ghostpirates_sw",
                "netent-goldtimer_sw",
                "netent-thunderfist_sw",
                "netent-evolution_sw",
                "netent-bloodsuckers_sw",
                "netent-eldorado_mobile_html_sw",
                "netent-zombies_sw",
                "netent-goldenshamrock_sw",
                "netent-excalibur_sw",
                "netent-diamonddogs_sw",
                "netent-simsalabim_sw",
                "netent-retro-funky70_sw",
                "netent-fruits_sw",
                "netent-scarface_sw",
                "netent-viking_sw",
                "netent-megajoker_sw",
                "netent-frankenstein_sw",
                "netent-jackandbeanstalk_sw",
                "netent-starburst_sw",
                "netent-reelpoker_sw",
                "netent-alienrobots_sw",
                "netent-retro-groovy60_sw",
                "netent-frog_sw",
                "microgaming-MGS_Hitman",
                "playngo-seahunter",
                "relax-northernsky",
                "netent-reelrush_not_mobile_sw",
                "microgaming-MGS_HTML5_SugarParade",
                "microgaming-MGS_MonsterWheels",
                "microgaming-MGS_HTML5_Hitman_BonusSlot",
                "netent-shangrila_mobile_html_sw",
                "nyx-lost_temple",
                "netent-fireflies_not_mobile_sw",
                "gt-dragons_wild_fire",
                "playngo-firejoker",
                "netent-jackhammer_not_mobile_sw",
                "tk-astronaut",
                "playngo-sevensins",
                "nyx-mild_rockers",
                "netent-asgardianstones_not_mobile_sw",
                "netent-butterflystaxx_not_mobile_sw",
                "netent-stickers_mobile_html_sw",
                "netent-stickers_not_mobile_sw",
                "netent-mythicmaiden_not_mobile_sw",
                "netent-finn_mobile_html_sw",
                "nyx-snowflakes",
                "playngo-goldkingmobile",
                "nyx-renegades",
                "gt-random_runner_vip_",
                "rgs-texas_tea",
                "wms-dragonspin",
                "netent-wolfcub_mobile_html_sw",
                "nyx-queen_of_riches",
                "gt-the_book",
                "wms-giantsgold_prt",
                "nyx-birthday",
                "relax-geniestouch",
                "microgaming-MGS_HTML5_JurassicWorld",
                "netent-hotline_not_mobile_sw",
                "netent-football_not_mobile_sw",
                "edict-bluep_wildantics",
                "ygg-jungle_books",
                "playngo-prissyprincess",
                "microgaming-MGS_StarlightKiss",
                "playngo-seahuntermobile",
                "microgaming-MGS_HTML5_Shoot!",
                "netent-hallofgods_not_mobile_sw",
                "playngo-hugotwo",
                "microgaming-MGS_HTML5_BonusSlot_StarlightKiss",
                "playngo-multifruit81",
                "nyx-kaiju",
                "microgaming-MGS_NinjaMagic",
                "playngo-bigwincatmobile",
                "relax-mayana",
                "netent-gunsnroses_mobile_html_sw",
                "netent-glow_sw",
                "netent-gunsnroses_not_mobile_sw",
                "netent-glow_mobile_html_sw",
                "playngo-jademagician",
                "relax-wildchase",
                "nyx-wonder_hounds",
                "rgs-lucky_larrys_lobstermania_2",
                "rgs-hexbreaker_2",
                "rgs-pacific_paradise",
                "wms-triplecashwheel",
                "microgaming-MGS_SugarParade",
                "microgaming-MGS_Gold_Factory",
                "microgaming-MGS_Carnaval",
                "microgaming-MGS_HTML5_MonsterWheels",
                "playngo-hugomobile",
                "netent-starburst_not_mobile_sw",
                "netent-finn_not_mobile_sw",
                "relax-humptydumpty",
                "netent-hooksheroes_not_mobile_sw",
                "netent-hooksheroes_mobile_html_sw",
                "relax-sabretooth",
                "tk-pink_elephants",
                "netent-secretsofchristmas_mobile_html_sw",
                "netent-steamtower_mobile_html_sw",
                "netent-steamtower_sw",
                "tk-s1-g4",
                "tk-turningtotems",
                "wms-calloffruity",
                "wms-swordofdestiny",
                "relax-tikitumble",
                "wms-lucky5reeler",
                "wms-vikingvanguard",
                "wms-titanic",
                "wms-mmmcosmiccash",
                "wms-arabiancharms",
                "netent-twinspin_mobile_html_sw",
                "wms-merrymoney",
                "relax-leprechaunhills",
                "playngo-enchantedmeadow",
                "wms-wizardofoz",
                "wms-wozrubyslippers",
                "wms-wickedriches",
                "wms-brucelee",
                "wms-brucelee2",
                "wms-kiss",
                "wms-elvis",
                "playngo-mysteryjoker6000",
                "wms-zeus",
                "wms-superjackpotparty",
                "wms-goldfish",
                "wms-reelemin",
                "wms-alice",
                "wms-leprechaunsfortune",
                "wms-kronos",
                "wms-invadersfromtheplanetmoolah",
                "wms-buffalospirit",
                "wms-rainbowriches",
                "wms-zeus3",
                "wms-bierhaus",
                "wms-spartacus",
                "wms-ragingrhino",
                "wms-firequeen",
                "wms-lunaris",
                "wms-montezuma",
                "wms-cooljewels",
                "netent-hallofgods_mobile_html_sw",
                "wms-seaoftranquility",
                "wms-lancelot",
                "wms-magicwand",
                "wms-gorillachief2",
                "wms-kingdomofthetitans",
                "wms-blackknight",
                "wms-luauloot",
                "wms-crystalforest",
                "wms-crystalforesthd",
                "wms-amazonqueen",
                "wms-temptationqueen",
                "wms-dragonsinferno",
                "wms-kingofafrica",
                "wms-egyptianriches",
                "wms-glitz",
                "wms-jackpoyblockparty",
                "wms-junglewild",
                "wms-heartsofvenice",
                "wms-romeandegypt",
                "wms-blackknightii",
                "netent-invisibleman_mobile_html_sw",
                "netent-invisibleman_not_mobile_sw",
                "wms-gemsgemsgems",
                "wms-giantsgold",
                "wms-redflagfleet",
                "netent-pyramid_not_mobile_sw",
                "netent-pyramid_mobile_html_sw",
                "nyx-slots_of_money",
                "netent-eldorado_not_mobile_sw",
                "tk-well_of_wonders",
                "playngo-firejokermobile",
                "netent-pota_not_mobile_sw",
                "wms-tetrissuperjackpots",
                "netent-jackandbeanstalk_mobile_html_sw",
                "microgaming-MGS_CricketStar_Flash_FeatureSlot",
                "relax-secondstrike",
                "playngo-enchantedcrystals",
                "rgs-wishwood",
                "netent-hallofgods_sw",
                "playngo-mysteryjoker",
                "microgaming-MGS_HTML5_FeatureSlotCricketStar",
                "playngo-prissyprincessmobile",
                "gt-dragons_mystery",
              ],
              tournamentChannels: [
                "/public/tournaments/618bcdc8-cb1c-3235-9f5d-7dff964e4e22",
                "/public/tournaments/33229c5c-af9e-323a-b82b-18a6bb74303e",
                "/public/tournaments/d536b2ca-7e4e-36e5-a551-f0c447488724",
                "/public/tournaments/11ce1bcd-6457-3f01-a45d-c32485ab2246",
                "/public",
              ],
            },
            featureFlags: ["AML_FLOW_17608", "MOBILE_VERIFICATION"],
            complianceState: {
              AML: {
                category: "AML",
                state: "TAGGED",
                playerBlockDate: null,
                depositBlockDate: null,
                withdrawalBlockDate: null,
              },
            },
            emailVerified: true,
            extentOfGambling: null,
            testPlayer: false,
          },
        },
      },
    },
    games: {
      topListsTitle: "Topplistor",
      searchTitle: "Skriv & sök",
      topListIds: [
        "latestPlayedGames",
        "popularGames",
        "newGames",
        "exclusiveGames",
        "casumoFavouriteGames",
        "liveCasino",
        "casumoJackpotGames",
      ],
      gamesLists: {
        exclusiveGames: {
          id: "exclusiveGames",
          title: "Bara på Casumo ",
          image: "",
          variants: {
            default: {
              totalGames: 6,
              hash: "f49ce68e1bcb48da58b6e32b975c4869",
            },
            guests: {
              totalGames: 6,
              hash: "f49ce68e1bcb48da58b6e32b975c4869",
            },
            includeDisabled: {
              totalGames: 9,
              hash: "86f677e654bfbe5535da8568627ebbf4",
            },
          },
        },
        latestPlayedGames: {
          id: "latestPlayedGames",
          title: "Senast spelade",
          image: "",
          variants: {
            default: {
              totalGames: 0,
              hash: "d751713988987e9331980363e24189ce",
            },
            guests: {
              totalGames: 0,
              hash: "d751713988987e9331980363e24189ce",
            },
            includeDisabled: {
              totalGames: 0,
              hash: "d751713988987e9331980363e24189ce",
            },
          },
        },
        allGames: {
          id: "allGames",
          title: "Alla spel",
          image: "",
          variants: {
            default: {
              totalGames: 1127,
              hash: "679d334baa5ad5918cbb359cc61f3905",
            },
            guests: {
              totalGames: 1127,
              hash: "679d334baa5ad5918cbb359cc61f3905",
            },
            includeDisabled: {
              totalGames: 1385,
              hash: "7b98d0153fdb9dcaa783c33be0d37d4c",
            },
          },
        },
        casumoFavouriteGames: {
          id: "casumoFavouriteGames",
          title: "Casumo gillar",
          image: "",
          variants: {
            default: {
              totalGames: 28,
              hash: "4595a76fb71a97e2f74f6756b326a3ac",
            },
            guests: {
              totalGames: 28,
              hash: "4595a76fb71a97e2f74f6756b326a3ac",
            },
            includeDisabled: {
              totalGames: 28,
              hash: "4595a76fb71a97e2f74f6756b326a3ac",
            },
          },
        },
        casumoJackpotGames: {
          id: "casumoJackpotGames",
          title: "Jackpots",
          image: "",
          variants: {
            default: {
              totalGames: 16,
              hash: "a9a92a6705c7a6067ef944ab69d2a088",
            },
            guests: {
              totalGames: 16,
              hash: "a9a92a6705c7a6067ef944ab69d2a088",
            },
            includeDisabled: {
              totalGames: 18,
              hash: "a159da7e5b0bde3da72359d46189e796",
            },
          },
        },
        newGames: {
          id: "newGames",
          title: "Nya spel",
          image: "",
          variants: {
            default: {
              totalGames: 90,
              hash: "14cbec8157f4178c10027d0b397e75ad",
            },
            guests: {
              totalGames: 90,
              hash: "14cbec8157f4178c10027d0b397e75ad",
            },
            includeDisabled: {
              totalGames: 101,
              hash: "87a39387287061f180529039433d1a9f",
            },
          },
        },
        popularGames: {
          id: "popularGames",
          title: "Populära",
          image: "",
          variants: {
            default: {
              totalGames: 21,
              hash: "14381a811488ea66c03db01d2e442104",
            },
            guests: {
              totalGames: 21,
              hash: "14381a811488ea66c03db01d2e442104",
            },
            includeDisabled: {
              totalGames: 23,
              hash: "d903315e241ba5ba5dba08fb21ae3419",
            },
          },
        },
        liveCasino: {
          id: "liveCasino",
          title: "Live Casino",
          image: "",
          variants: {
            default: {
              totalGames: 8,
              hash: "f32fc291d5a51c79465a9b47d627fad6",
            },
            guests: {
              totalGames: 8,
              hash: "f32fc291d5a51c79465a9b47d627fad6",
            },
            includeDisabled: {
              totalGames: 11,
              hash: "aeb93c227b1eaf34a02e065240ab0520",
            },
          },
        },
      },
    },
  },
  schema: {
    adventurer: {
        ...AdventurerMock,
    },
    gameProvider: {
      "casumo-services-ltd-nyx": {
        id: "0c900240-4904-11e6-a7a2-005056a975b1",
        name: "Nyx",
        inMaintenance: false,
        slug: "casumo-services-ltd-nyx",
        gameCount: 8,
        games: [
          "bloodsuckers",
          "easter-island",
          "starburst",
          "bakers-treat",
          "rapunzels-tower",
          "big-bad-wolf",
          "book-of-ra-deluxe",
          "diamond-mine",
        ],
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/03/nyx-bg.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
        url: "/en/games/provider/nyx",
      },
      "casumo-services-ltd-thunderkick": {
        id: "0d7382f0-d94d-11e3-a4fd-005056a03af2",
        name: "thunderkick",
        inMaintenance: false,
        slug: "casumo-services-ltd-thunderkick",
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/03/thunderkick-bg.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2019/02/thunderkick.png",
        url: "/en/games/provider/thunderkick",
      },
      "casumo-services-ltd-microgaming": {
        id: "1ad9a810-2425-11e5-bd73-005056a03973",
        name: "microgaming",
        inMaintenance: false,
        slug: "casumo-services-ltd-microgaming",
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/03/microgaming-bg.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2019/02/microgaming1.png",
        url: "/en/games/provider/microgaming",
      },
      "casumo-services-ltd-redtiger": {
        id: "32554540-d2db-11e8-bd8b-0242ac110003",
        name: "redtiger",
        inMaintenance: false,
        slug: "casumo-services-ltd-redtiger",
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/03/redtiger-bg.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2019/02/redtiger1.png",
        url: "/en/games/provider/redtiger",
      },
    },
    game: {
      bloodsuckers: {
        name: "Blood Suckers",
        slug: "bloodsuckers",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/BloodSuckers_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/BloodSuckers_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "easter-island": {
        name: "Easter Island",
        slug: "easter-island",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      starburst: {
        name: "Starburst",
        slug: "starburst",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/Starburst_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/Starburst_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "bakers-treat": {
        name: "Baker&#8217;s Treat",
        slug: "bakers-treat",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/04/bakers_treat_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/bakers_treat_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "rapunzels-tower": {
        name: "Rapunzel&#8217;s Tower",
        slug: "rapunzels-tower",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/rapunzels_tower_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/rapunzels_tower_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "big-bad-wolf": {
        name: "Big Bad Wolf",
        slug: "big-bad-wolf",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/08/bigbadwolfbgthumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/08/bigbadwolf_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "book-of-ra-deluxe": {
        name: "Book of Ra deluxe",
        slug: "book-of-ra-deluxe",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/11/book-of-ra-deluxe_gamethumb-plate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/11/book-of-ra-deluxe_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "diamond-mine": {
        name: "Diamond Mine",
        slug: "diamond-mine",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/04/diamond_mine_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/diamond-mine-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "raging-rhino": {
        name: "Raging Rhino",
        slug: "raging-rhino",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/03/RagingRhino-backplate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/03/RagingRhino-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "jammin-jars": {
        name: "Jammin Jars",
        slug: "jammin-jars",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjars-bg-480-580.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjar-logo-480x580.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "legacy-of-egypt": {
        name: "Legacy of Egypt",
        slug: "legacy-of-egypt",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      gemix: {
        name: "Gemix",
        slug: "gemix",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/06/Gemix-desktop-thumb1.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/06/Gemix-desktop-logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "danger-high-voltage": {
        name: "Danger High Voltage",
        slug: "danger-high-voltage",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/08/danger_high_voltage_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/08/danger_high_voltage_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "88-fortunes": {
        name: "88 Fortunes",
        slug: "88-fortunes",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/06/88_fortune_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/06/88_fortune_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "fruit-warp": {
        name: "Fruit Warp",
        slug: "fruit-warp",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/08/fruitwarp_background.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/08/fuitwarplogo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "gonzos-quest": {
        name: "Gonzo&#8217;s Quest",
        slug: "gonzos-quest",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "rainbow-riches-pick-n-mix": {
        name: "Rainbow Riches Pick `n´ Mix",
        slug: "rainbow-riches-pick-n-mix",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/03/rainbow_riches_pickmix_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/03/rainbow_riches_pickmix_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "white-rabbit": {
        name: "White Rabbit",
        slug: "white-rabbit",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/11/white_rabbit_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/11/white-rabbit.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "action-bank": {
        name: "Action Bank",
        slug: "action-bank",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/04/action-bank_game-backgroundplate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/04/action-bank_game-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wild-toro": {
        name: "Wild Toro",
        slug: "wild-toro",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/wild_toro_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/wild_toro_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "twin-spin": {
        name: "Twin Spin",
        slug: "twin-spin",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/TwinSpin_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/TwinSpin_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wish-upon-a-leprechaun": {
        name: "Wish Upon a Leprechaun",
        slug: "wish-upon-a-leprechaun",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/03/wish_upon_a_leprechaun_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/03/wish_upon_a_leprechaun_logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      cleopatra: {
        name: "Cleopatra",
        slug: "cleopatra",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/05/CleopatraBg2.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/05/Cleopatralogo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "eastern-emeralds": {
        name: "Eastern Emeralds",
        slug: "eastern-emeralds",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/06/eastern_emeralds_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/06/eastern_emeralds_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      vikings: {
        name: "Vikings",
        slug: "vikings",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/vikings-thumbnail-bg.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/vikings-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "rocket-fellas": {
        name: "Rocket Fellas Inc",
        slug: "rocket-fellas",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/rocket_fellas_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/rocket_fellas_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "monopoly-250k": {
        name: "Monopoly 250k",
        slug: "monopoly-250k",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/monopoly_millionare_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/monopoly-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "its-magic": {
        name: "It&#8217;s Magic",
        slug: "its-magic",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/its_magic_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/its_magic_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "baron-samedi": {
        name: "Baron Samedi",
        slug: "baron-samedi",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/baron_samedi_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/baron_samedi_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "primal-megaways": {
        name: "Primal Megaways",
        slug: "primal-megaways",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/primal_megaways-thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/primal-megaways-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "crystal-rift": {
        name: "Crystal Rift",
        slug: "crystal-rift",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/crystal_rift_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/crystal_rift_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "astro-legends-lyra-and-erion": {
        name: "Astro Legends Lyra and Erion",
        slug: "astro-legends-lyra-and-erion",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/astro_legends_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/astro_legends_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "quick-hit-super-wheel-wild-red": {
        name: "Quick Hit Super Wheel Wild Red",
        slug: "quick-hit-super-wheel-wild-red",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/quick_hit_super_wheel_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/quick_hit_super_wheel_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "stellar-jackpots-silver-lion": {
        name: "Stellar Jackpots Silver Lion",
        slug: "stellar-jackpots-silver-lion",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/stellar_silver_lion_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/stellar_silver_lion_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "asian-fortunes": {
        name: "Asian Fortunes",
        slug: "asian-fortunes",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/asian_fortunes_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/asian_fortunes_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "triple-dragons": {
        name: "Triple Dragons",
        slug: "triple-dragons",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/triple_dragons_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/triple_dragons_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "nitro-circus": {
        name: "Nitro Circus",
        slug: "nitro-circus",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/nitro_circus_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/nitro_circus_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "dragon-maiden": {
        name: "Dragon Maiden",
        slug: "dragon-maiden",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/dragons_maiden-thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/dragon_maiden_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "monkey-god": {
        name: "Monkey God",
        slug: "monkey-god",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/monkey_god_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/monkey_god_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wild-country": {
        name: "Wild Country",
        slug: "wild-country",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/wild_country_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/wild_country_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "tigers-glory": {
        name: "Tiger&#8217;s Glory",
        slug: "tigers-glory",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/tigers_glory-thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/tigers_glory_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "reel-talent": {
        name: "Reel Talent",
        slug: "reel-talent",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/reel_talent_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/reel_talent_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "almighty-reels-garden-of-persephone": {
        name: "Almighty Reels &#8211; Garden of Persephone",
        slug: "almighty-reels-garden-of-persephone",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/garden-of-persephone_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/garden-of-persephone_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "vegas-diamonds": {
        name: "Vegas Diamonds",
        slug: "vegas-diamonds",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/vegas_diamonds_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/vegas_diamonds_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "topwheel-treasures": {
        name: "Topwheel Treasures",
        slug: "topwheel-treasures",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/08/TopwheelTreasuresBack.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2018/08/TTLogo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        disabledForLoggedOut: false,
        jackpotId: null,
        tableId: "munbzmuueehqaavs",
        lobby: "munbzmuueehqaavs",
      },
      "the-tales-of-dr-dolittle": {
        name: "The Tales of Dr. Dolittle",
        slug: "the-tales-of-dr-dolittle",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/drdolittle-bg-thumb.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/drdolittle-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "grizzly-gold": {
        name: "Grizzly Gold",
        slug: "grizzly-gold",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/grizzlygold-tb-bg.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/grizzlygold-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "casumo-roulette": {
        name: "Roulette",
        slug: "casumo-roulette",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-back-roulette.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-logo-roulette.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: "madlz3bzhyeabit4",
      },
      "casumo-blackjack-evolution": {
        name: "Blackjack 1",
        slug: "casumo-blackjack-evolution",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-back-blackjack.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-logo-blackjack1.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: "lnte5m7j7jdaadpm",
      },
      "casumo-blackjack-2-evolution": {
        name: "Blackjack 2",
        slug: "casumo-blackjack-2-evolution",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-back-blackjack.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-logo-blackjack2.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "casumo-blackjack-club-room-evolution": {
        name: "Blackjack Club Room",
        slug: "casumo-blackjack-club-room-evolution",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-back-blackjack.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/10/blackjack-clubroom.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "casumo-blackjack-3-evolution": {
        name: "Blackjack 3",
        slug: "casumo-blackjack-3-evolution",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-back-blackjack.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/img-logo-blackjack3.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      bonanza: {
        name: "Bonanza",
        slug: "bonanza",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/08/bonanza_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/bonanza-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "ancient-egypt-classic": {
        name: "Ancient Egypt Classic",
        slug: "ancient-egypt-classic",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/ancient_egypt_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/ancient_egypt_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "fat-rabbit": {
        name: "Fat Rabbit",
        slug: "fat-rabbit",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/03/fat_rabbit_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/03/fat_rabbit_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "vikings-go-berzerk": {
        name: "Vikings Go Berzerk",
        slug: "vikings-go-berzerk",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/06/vikings_go_berzerk_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/06/vikings_go_berzerk_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "reel-rush": {
        name: "Reel Rush",
        slug: "reel-rush",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/ReelRush_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/ReelRush_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wolf-gold": {
        name: "Wolf Gold",
        slug: "wolf-gold",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "dwarfs-gone-wild": {
        name: "Dwarfs Gone Wild",
        slug: "dwarfs-gone-wild",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/06/dwarfs_gone_wild_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/06/dwarfs_gone_wild_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      donuts: {
        name: "Donuts",
        slug: "donuts",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/06/donuts_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/06/donuts_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      reactoonz: {
        name: "Reactoonz",
        slug: "reactoonz",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "sticky-bandits": {
        name: "Sticky Bandits",
        slug: "sticky-bandits",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/08/sticky_bandits_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/08/sticky_bandits_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      montezuma: {
        name: "Montezuma",
        slug: "montezuma",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/01/Montezuma-backplate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/01/Montezuma_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      goldilocks: {
        name: "Goldilocks",
        slug: "goldilocks",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/06/goldilocks_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/06/goldilocks_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "book-of-dead": {
        name: "Book of Dead",
        slug: "book-of-dead",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/01/book-of-dead-backplate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/book_of_dead_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "fire-joker": {
        name: "Fire Joker",
        slug: "fire-joker",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/06/PlayNGo-FireJoker-Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/06/PlayNGo-FireJoker-Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "lucky-ladys-charm-deluxe": {
        name: "Lucky Lady’s Charm deluxe",
        slug: "lucky-ladys-charm-deluxe",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/11/Lucky-Ladys-Charm_gamethumb-background.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/11/Lyck-Ladys-Charm_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "moon-princess": {
        name: "Moon Princess",
        slug: "moon-princess",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/07/moon_princess_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/07/moon_princess_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "viking-runecraft": {
        name: "Viking Runecraft",
        slug: "viking-runecraft",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/04/viking_runecraft_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/04/viking_runecraft_logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "extra-chilli": {
        name: "Extra Chilli",
        slug: "extra-chilli",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/04/extra_chilli_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/extra-chilli-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "lady-of-fortune": {
        name: "Lady of Fortune",
        slug: "lady-of-fortune",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/06/Lady-of-Fortune-desktop-thumb1.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/06/Lady-of-Fortune-desktop-logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "dragons-luck": {
        name: "Dragon&#8217;s Luck",
        slug: "dragons-luck",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/dragons_luck_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/dragons_luck_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "rainbow-jackpots": {
        name: "Rainbow Jackpots",
        slug: "rainbow-jackpots",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/rainbow_jackpots_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/rainbow_jackpots_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "tiki-fruits": {
        name: "Tiki Fruits",
        slug: "tiki-fruits",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/tiki_fruits_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/tiki_fruits_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "flaming-fox": {
        name: "Flaming Fox",
        slug: "flaming-fox",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/flaming_fox_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/flaming_fox_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "treasure-mine": {
        name: "Treasure Mine",
        slug: "treasure-mine",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/treasure_mine_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/treasure_mine_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "arcade-bomb": {
        name: "Arcade Bomb",
        slug: "arcade-bomb",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/arcade_bomb_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/arcade_bomb_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "piggy-pirates": {
        name: "Piggy Pirates",
        slug: "piggy-pirates",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/piggy_pirates_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/piggy_pirates_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "jack-in-a-pot": {
        name: "Jack In A Pot",
        slug: "jack-in-a-pot",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/11/jack_in_a_pot_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/11/jack_in_a_pot_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "gems-gone-wild": {
        name: "Gems Gone Wild",
        slug: "gems-gone-wild",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/gems_gone_wild_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/gems_gone_wild_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "lucky-wizard": {
        name: "Lucky Wizard",
        slug: "lucky-wizard",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/lucky_wizard_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/lucky_wizard_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "totem-lightning": {
        name: "Totem Lightning",
        slug: "totem-lightning",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/totem_lightning_thumbnail1.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/totem_lightning_logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "fortune-charm": {
        name: "Fortune Charm",
        slug: "fortune-charm",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/fortune_charm_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/fortune_charm_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "reel-heist": {
        name: "Reel Heist",
        slug: "reel-heist",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/reel_heist_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/reel_heist_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wild-wild-chest": {
        name: "Wild Wild Chest",
        slug: "wild-wild-chest",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_wild_chest_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_wild_chest_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "esqueleto-mariachi": {
        name: "Esqueleto Mariachi",
        slug: "esqueleto-mariachi",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/esqueleto_mariachi_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/esqueleto_mariachi_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "ras-legend": {
        name: "Ra&#8217;s Legend",
        slug: "ras-legend",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/ras_legend_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/ras_legend_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "golden-offer": {
        name: "Golden Offer",
        slug: "golden-offer",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/golden_offer_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/golden_offer_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "persian-fortune": {
        name: "Persian Fortune",
        slug: "persian-fortune",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/persian_fortune_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/persian_fortune_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wild-circus": {
        name: "Wild Circus",
        slug: "wild-circus",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_circus_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_circus_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "golden-temple": {
        name: "Golden Temple",
        slug: "golden-temple",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/golden_temple_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/golden_temple_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "mega-fortune-dreams": {
        name: "Mega Fortune Dreams",
        slug: "mega-fortune-dreams",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/01/megafortune-dreams-bg2.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/01/megafortune-dreams-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "netent-megafortunedreams_mega",
        tableId: null,
      },
      "mega-fortune": {
        name: "Mega Fortune",
        slug: "mega-fortune",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/06/MegaFortune_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/MegaFortune_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "netent-megajackpot1",
        tableId: null,
      },
      "hall-of-gods": {
        name: "Hall of Gods",
        slug: "hall-of-gods",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2014/11/hall-of-gods-bg-thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/11/hall-of-gods-logo-thumb1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "netent-hog_large",
        tableId: null,
      },
      "mega-moolah": {
        name: "Mega Moolah",
        slug: "mega-moolah",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/07/MegaMoolah_backplate-1.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/07/MegaMoolah_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "divine-fortune": {
        name: "Divine Fortune",
        slug: "divine-fortune",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/01/divine_fortune_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/01/divine_fortune_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "netent-gof_mega",
        tableId: null,
      },
      "arabian-nights": {
        name: "Arabian Nights",
        slug: "arabian-nights",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2012/04/ArabianNights_Thumb.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2012/04/ArabianNights_Logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "netent-arabian",
        tableId: null,
      },
      "dancing-in-rio": {
        name: "Dancing in Rio",
        slug: "dancing-in-rio",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/07/dancing_in_rio_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/07/dancing_in_rio_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "gunslinger-reloaded": {
        name: "Gunslinger Reloaded",
        slug: "gunslinger-reloaded",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/gunslinger_reloaded_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/gunslinger_reloaded_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: "playngo-113",
        tableId: null,
      },
      "irish-riches": {
        name: "Irish Riches",
        slug: "irish-riches",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/06/irish_riches_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/06/irish-riches-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "top-cat": {
        name: "Top Cat",
        slug: "top-cat",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/03/top_cat_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/09/top_cat_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "power-force-heroes": {
        name: "Power Force Heroes",
        slug: "power-force-heroes",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/05/power_force_heroes_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/05/power_force_heroes_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "power-force-villains": {
        name: "Power Force Villains",
        slug: "power-force-villains",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/05/power_force_villains_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/05/power_force_villains_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "monkeys-millions": {
        name: "Monkey&#8217;s Millions",
        slug: "monkeys-millions",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/06/monkeys_millions_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/06/monkeys_millions_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: "gt-11047",
        tableId: null,
      },
      "keystone-kops": {
        name: "Keystone Kops",
        slug: "keystone-kops",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/04/keystone_kops_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/Keystone_kops_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "jackpot-diamonds": {
        name: "Jackpot Diamonds",
        slug: "jackpot-diamonds",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/03/jackpot_diamonds_hiroller_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/03/jackpot_diamonds_hiroller_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "baccarat-a": {
        name: "Baccarat A",
        slug: "baccarat-a",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/05/live-baccarat-bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/05/live-baccarat-logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        disabledForLoggedOut: false,
        jackpotId: null,
        tableId: "oytmvb9m1zysmc44",
        lobby: "oytmvb9m1zysmc44",
      },
      "evolution-live-football-studio": {
        name: "Football Studio",
        slug: "evolution-live-football-studio",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/06/FootballStudio.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/06/FootballLogo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        disabledForLoggedOut: false,
        jackpotId: null,
        tableId: "TopCard000000001",
        lobby: "TopCard000000001",
      },
      "evolution-live-ultimate-texas-holdem": {
        name: "Ultimate Texas Hold&#8217;em",
        slug: "evolution-live-ultimate-texas-holdem",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/12/Ultimate-bp.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/12/Ultimate-logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        disabledForLoggedOut: false,
        jackpotId: null,
        tableId: "UTHTable00000001",
        lobby: "UTHTable00000001",
      },
      "dream-catcher": {
        name: "Dream Catcher",
        slug: "dream-catcher",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/09/dream_catcher_bg-copy.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/05/dream_catcher_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        disabledForLoggedOut: false,
        jackpotId: null,
        tableId: "MOWDream00000001",
        lobby: "MOWDream00000001",
      },
    },
    liveTable: {
      munbzmuueehqaavs: {
        tableId: "munbzmuueehqaavs",
        type: "MoneyWheel",
        image: "https://lob.egcvi.com/thumbnail/csor1_mw_med_L.jpg",
        bets: { symbol: "€", min: 0.1, max: 2500 },
        players: 2,
        results: ["01", "01", "05", "01", "01", "01", "02", "01", "02"],
        betBehind: null,
        seats: null,
        provider: "casumo",
      },
      oytmvb9m1zysmc44: {
        tableId: "oytmvb9m1zysmc44",
        type: "Baccarat",
        image: "https://lob.egcvi.com/thumbnail/bac2_bs_med_L.jpg",
        bets: { symbol: "€", min: 1, max: 10000 },
        players: 1,
        results: [
          "P",
          "B",
          "P",
          "B",
          "B",
          "B",
          "B",
          "B",
          "B",
          "B",
          "B",
          "P",
          "P",
          "B",
          "P",
        ],
        betBehind: null,
        seats: null,
        provider: "evolution",
        road: [
          {
            location: { column: 0, row: 0 },
            color: "Blue",
            score: 7,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: false,
          },
          {
            location: { column: 0, row: 1 },
            color: "Blue",
            score: 6,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: false,
          },
          {
            location: { column: 1, row: 0 },
            color: "Red",
            score: 8,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: true,
          },
          {
            location: { column: 1, row: 1 },
            color: "Red",
            score: 9,
            ties: 1,
            playerPair: false,
            bankerPair: true,
            natural: false,
          },
          {
            location: { column: 2, row: 0 },
            color: "Blue",
            score: 2,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: false,
          },
          {
            location: { column: 3, row: 0 },
            color: "Red",
            score: 7,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: false,
          },
          {
            location: { column: 4, row: 0 },
            color: "Blue",
            score: 4,
            ties: 0,
            playerPair: false,
            bankerPair: false,
            natural: false,
          },
        ],
        history: ["P", "B", "P", "T", "B", "B", "P", "P"],
      },
      TopCard000000001: {
        tableId: "TopCard000000001",
        type: "TopCard",
        image: "https://lob.egcvi.com/thumbnail/topcr1_bs_med_L.jpg",
        bets: { symbol: "€", min: 1, max: 15000 },
        players: 3,
        results: [
          "R",
          "T",
          "L",
          "L",
          "R",
          "R",
          "L",
          "R",
          "R",
          "R",
          "R",
          "T",
          "R",
          "R",
          "L",
          "R",
          "R",
          "L",
          "L",
          "R",
          "L",
        ],
        betBehind: null,
        seats: null,
        provider: "evolution",
        history: ["L", "R", "L", "T", "L", "T", "R", "L", "R", "R", "R"],
      },
      UTHTable00000001: {
        tableId: "UTHTable00000001",
        type: "UTH",
        image: "https://lob.egcvi.com/thumbnail/pk_uth1_med_L.jpg",
        bets: { symbol: "€", min: 5, max: 600 },
        players: 2,
        results: null,
        betBehind: null,
        seats: null,
        provider: "evolution",
      },
      MOWDream00000001: {
        tableId: "MOWDream00000001",
        type: "MoneyWheel",
        image: "https://lob.egcvi.com/thumbnail/dc1_mw_med_L.jpg",
        bets: { symbol: "€", min: 0.1, max: 5000 },
        players: 3,
        results: ["02", "01", "01", "20", "01", "X2", "05", "05", "02"],
        betBehind: null,
        seats: null,
        provider: "evolution",
      },
    },
    jackpot: {
      "playngo-941": {
        currencyCode: "EUR",
        gameId: "playngo-941",
        formattedJackpotAmount: "0,03 €",
      },
      "playngo-127": {
        currencyCode: "EUR",
        gameId: "playngo-127",
        formattedJackpotAmount: "10.000,00 €",
      },
      "netent-gof_mega": {
        currencyCode: "EUR",
        gameId: "netent-gof_mega",
        formattedJackpotAmount: "11.145,41 €",
      },
      "netent-wonder2": {
        currencyCode: "EUR",
        gameId: "netent-wonder2",
        formattedJackpotAmount: "10.734,66 €",
      },
      "playngo-183": {
        currencyCode: "EUR",
        gameId: "playngo-183",
        formattedJackpotAmount: "66,84 €",
      },
      "playngo-131": {
        currencyCode: "EUR",
        gameId: "playngo-131",
        formattedJackpotAmount: "25.000,00 €",
      },
      "netent-vault": {
        currencyCode: "EUR",
        gameId: "netent-vault",
        formattedJackpotAmount: "7.200,00 €",
      },
      "playngo-186": {
        currencyCode: "EUR",
        gameId: "playngo-186",
        formattedJackpotAmount: "5.507,86 €",
      },
      "playngo-130": {
        currencyCode: "EUR",
        gameId: "playngo-130",
        formattedJackpotAmount: "2.500,00 €",
      },
      "netent-frog1": {
        currencyCode: "EUR",
        gameId: "netent-frog1",
        formattedJackpotAmount: "128,42 €",
      },
      "netent-megafortunedreams_rapid": {
        currencyCode: "EUR",
        gameId: "netent-megafortunedreams_rapid",
        formattedJackpotAmount: "936,42 €",
      },
      "netent-hog_large": {
        currencyCode: "EUR",
        gameId: "netent-hog_large",
        formattedJackpotAmount: "2.265.747,90 €",
      },
      "netent-cf_minifix": {
        currencyCode: "EUR",
        gameId: "netent-cf_minifix",
        formattedJackpotAmount: "500,00 €",
      },
      "playngo-940": {
        currencyCode: "EUR",
        gameId: "playngo-940",
        formattedJackpotAmount: "0,02 €",
      },
      "playngo-450": {
        currencyCode: "EUR",
        gameId: "playngo-450",
        formattedJackpotAmount: "2.000,00 €",
      },
      "netent-fishyfortune": {
        currencyCode: "EUR",
        gameId: "netent-fishyfortune",
        formattedJackpotAmount: "100,00 €",
      },
      "netent-megafortunedreams_major": {
        currencyCode: "EUR",
        gameId: "netent-megafortunedreams_major",
        formattedJackpotAmount: "7.055,12 €",
      },
      "netent-megajackpot3": {
        currencyCode: "EUR",
        gameId: "netent-megajackpot3",
        formattedJackpotAmount: "1.587,66 €",
      },
      "netent-megafortunedreams_mega": {
        currencyCode: "EUR",
        gameId: "netent-megafortunedreams_mega",
        formattedJackpotAmount: "3.063.698,50 €",
      },
      "playngo-133": {
        currencyCode: "EUR",
        gameId: "playngo-133",
        formattedJackpotAmount: "1.000,00 €",
      },
      "netent-hog_small": {
        currencyCode: "EUR",
        gameId: "netent-hog_small",
        formattedJackpotAmount: "887,59 €",
      },
      "netent-cashbomb": {
        currencyCode: "EUR",
        gameId: "netent-cashbomb",
        formattedJackpotAmount: "3.600,00 €",
      },
      "playngo-184": {
        currencyCode: "EUR",
        gameId: "playngo-184",
        formattedJackpotAmount: "1.023,48 €",
      },
      "netent-keno": {
        currencyCode: "EUR",
        gameId: "netent-keno",
        formattedJackpotAmount: "5.002,97 €",
      },
      "netent-hrscratchticketjp": {
        currencyCode: "EUR",
        gameId: "netent-hrscratchticketjp",
        formattedJackpotAmount: "30.000,00 €",
      },
      "netent-goldrush": {
        currencyCode: "EUR",
        gameId: "netent-goldrush",
        formattedJackpotAmount: "1.440,00 €",
      },
      "netent-hog_medium": {
        currencyCode: "EUR",
        gameId: "netent-hog_medium",
        formattedJackpotAmount: "6.056,86 €",
      },
      "playngo-939": {
        currencyCode: "EUR",
        gameId: "playngo-939",
        formattedJackpotAmount: "0,01 €",
      },
      "netent-wonder1": {
        currencyCode: "EUR",
        gameId: "netent-wonder1",
        formattedJackpotAmount: "989,77 €",
      },
      "playngo-132": {
        currencyCode: "EUR",
        gameId: "playngo-132",
        formattedJackpotAmount: "31.452,85 €",
      },
      "netent-cf_mega": {
        currencyCode: "EUR",
        gameId: "netent-cf_mega",
        formattedJackpotAmount: "15.985,96 €",
      },
      "netent-frog3": {
        currencyCode: "EUR",
        gameId: "netent-frog3",
        formattedJackpotAmount: "5.132,78 €",
      },
      "netent-arabian": {
        currencyCode: "EUR",
        gameId: "netent-arabian",
        formattedJackpotAmount: "5.000,00 €",
      },
      "netent-cf_rapidfix": {
        currencyCode: "EUR",
        gameId: "netent-cf_rapidfix",
        formattedJackpotAmount: "100,00 €",
      },
      "playngo-128": {
        currencyCode: "EUR",
        gameId: "playngo-128",
        formattedJackpotAmount: "25,00 €",
      },
      "playngo-942": {
        currencyCode: "EUR",
        gameId: "playngo-942",
        formattedJackpotAmount: "0,04 €",
      },
      "playngo-449": {
        currencyCode: "EUR",
        gameId: "playngo-449",
        formattedJackpotAmount: "100,00 €",
      },
      "netent-megajackpot1": {
        currencyCode: "EUR",
        gameId: "netent-megajackpot1",
        formattedJackpotAmount: "2.068.903,31 €",
      },
      "netent-cf_midi": {
        currencyCode: "EUR",
        gameId: "netent-cf_midi",
        formattedJackpotAmount: "2.232,92 €",
      },
      "netent-cstud": {
        currencyCode: "EUR",
        gameId: "netent-cstud",
        formattedJackpotAmount: "10.085,20 €",
      },
      "netent-horserace": {
        currencyCode: "EUR",
        gameId: "netent-horserace",
        formattedJackpotAmount: "1.000,00 €",
      },
      "netent-cf_major": {
        currencyCode: "EUR",
        gameId: "netent-cf_major",
        formattedJackpotAmount: "4.426,07 €",
      },
      "playngo-129": {
        currencyCode: "EUR",
        gameId: "playngo-129",
        formattedJackpotAmount: "250,00 €",
      },
      "netent-megajackpot2": {
        currencyCode: "EUR",
        gameId: "netent-megajackpot2",
        formattedJackpotAmount: "7.499,33 €",
      },
      "playngo-185": {
        currencyCode: "EUR",
        gameId: "playngo-185",
        formattedJackpotAmount: "2.289,09 €",
      },
      "netent-hrscratchticketjpb": {
        currencyCode: "EUR",
        gameId: "netent-hrscratchticketjpb",
        formattedJackpotAmount: "50.000,00 €",
      },
      "netent-megajoker": {
        currencyCode: "EUR",
        gameId: "netent-megajoker",
        formattedJackpotAmount: "2.128,31 €",
      },
      "playngo-126": {
        currencyCode: "EUR",
        gameId: "playngo-126",
        formattedJackpotAmount: "5.000,00 €",
      },
      "netent-frog2": {
        currencyCode: "EUR",
        gameId: "netent-frog2",
        formattedJackpotAmount: "553,11 €",
      },
      "netent-bingo": {
        currencyCode: "EUR",
        gameId: "netent-bingo",
        formattedJackpotAmount: "1.000,00 €",
      },
    },
    jackpotMustDrop: {
      "31001": {
        name: "Daily Drop Jackpot",
        type: "time",
        amount: { value: "887.50", currency: "GBP", formattedAmount: "£887" },
        target: "2018-11-22 22:00:00",
      },
      "31002": {
        name: "Must Drop Jackpot",
        type: "ceiling",
        amount: { value: "91.39", currency: "GBP", formattedAmount: "£91" },
        target: {
          value: "900.00",
          currency: "GBP",
          formattedAmount: "£900.00",
        },
      },
      "31003": {
        name: "Mega Drop Jackpot",
        type: "progressive",
        amount: {
          value: "17780.98",
          currency: "GBP",
          formattedAmount: "£17,780",
        },
        target: null,
      },
    },
    gameList: {
      popularGames: {
        games: [
          "book-of-dead",
          "diamond-mine",
          "jammin-jars",
          "extra-chilli",
          "fat-rabbit",
          "book-of-ra-deluxe",
          "gonzos-quest",
          "big-bad-wolf",
          "gemix",
          "vikings-go-berzerk",
          "starburst",
          "fruitshop",
          "bloodsuckers",
          "twin-spin",
          "88-fortunes",
          "eastern-emeralds",
          "troll-hunters",
          "reel-rush",
          "razortooth",
          "thunderstruck-ii",
        ],
        id: "popularGames",
        title: "Populära",
      },
      newGames: {
        games: [
          "ancient-egypt-classic",
          "lucha-legends",
          "shields-of-the-wild",
          "dinosaur-kingdom",
          "wheel-of-fortune-hawaiian-getaway",
          "wild-bazaar",
          "the-goonies",
          "gunslinger-reloaded",
          "romanov-riches",
          "dark-vortex",
          "halloween-jack",
          "grizzly-gold",
          "zombie-circus",
          "mermaids-queen",
          "quick-hit-ultra-pays-sun-dragon",
          "tiger-rush",
          "vegas-magic",
          "buffalo-rising-megaways",
          "polterheist",
          "tales-of-darkness-full-moon",
        ],
        id: "newGames",
        title: "Nya spel",
      },
      exclusiveGames: {
        games: [
          "topwheel-treasures",
          "the-tales-of-dr-dolittle",
          "grizzly-gold",
          "kingdom-of-fortune",
          "casumo-roulette",
          "casumo-blackjack-evolution",
        ],
        id: "exclusiveGames",
        title: "Bara på Casumo ",
      },
      casumoFavouriteGames: {
        games: [
          "eastern-emeralds",
          "donuts",
          "fire-joker",
          "vikings-go-berzerk",
          "fruit-warp",
          "reactoonz",
          "sticky-bandits",
          "dwarfs-gone-wild",
          "easter-island",
          "goldilocks",
          "bonanza",
          "legacy-of-egypt",
          "pirates-charm",
          "vikings-go-to-hell",
          "moon-princess",
          "crystal-queen",
          "foxin-wins",
          "break-da-bank-again",
          "viking-runecraft",
          "jumanji",
        ],
        id: "casumoFavouriteGames",
        title: "Casumo gillar",
      },
      liveCasinoGames: {
        games: [
          "topwheel-treasures",
          "baccarat-a",
          "evolution-live-football-studio",
          "evolution-live-ultimate-texas-holdem",
          "dream-catcher",
        ],
        id: "liveCasino",
        title: "Live Casino",
      },
      casumoJackpotGames: {
        games: [
          "joker-millions",
          "mega-fortune-dreams",
          "mega-fortune",
          "hall-of-gods",
          "mega-moolah",
          "divine-fortune",
          "dancing-in-rio",
          "book-of-ra-deluxe-jackpot-edition",
          "holmes-and-the-stolen-stones",
          "gunslinger-reloaded",
          "irish-riches",
          "top-cat",
          "power-force-heroes",
          "monkeys-millions",
          "keystone-kops",
          "jackpot-diamonds",
        ],
        id: "casumoJackpotGames",
        title: "Jackpots",
      },
      mustDropJackpotGames: {
        games: [
          "dragons-luck",
          "rainbow-jackpots",
          "tiki-fruits",
          "flaming-fox",
          "treasure-mine",
          "arcade-bomb",
          "piggy-pirates",
          "jack-in-a-pot",
          "gems-gone-wild",
          "lucky-wizard",
          "totem-lightning",
          "fortune-charm",
          "reel-heist",
          "wild-wild-chest",
          "esqueleto-mariachi",
          "ras-legend",
          "golden-offer",
          "persian-fortune",
          "wild-circus",
          "golden-temple",
        ],
        id: "mustDropJackpotGames",
        title: "Must Drop Jackpots",
      },
    },
    cms: {
      "mobile.menu-2": {
        slug: "mobile.menu-2",
        fields: {
          game_browser_link_text: "Game browser",
          settings_link_text: "Your settings",
          play_okay_settings_link_text: "Play Okay Settings",
          contact_us_link_text: "Email us",
          play_okay_link_text: "Play Okay",
          blog_menu_text: "Blog",
          faq_link_text: "FAQ",
          about_us_link_text: "About Casumo",
        }
      },
      "reel-races.reel-race-templates": {
        slug: "reel-races.reel-race-templates",
        fields: {
          "spins": "Spins",
          "duration": "Duration",
          "duration_template": "{{{duration}}} min",
          "min_bet": "Min Bet",
          "starting_in": "Starting in",
          "ending_in": "Ending in",
          "opt_in": "Opt In",
          "opted_in": "Opted In",
          "opted_in_cta_single_game_short": "Play",
          "compete_for": "Compete for {{prize}}",
          "title": "Reel Races",
          "caveat_short": "false",
          "prize": "20€",
        }
      },
      "curated.curated-gb_en": {
        id: "87759",
        slug: "curated.curated-gb_en",
        title: "Curated Component &#8211; se_sv",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-portrait.png",
            title: "wintergames-tablet-portrait",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-landscape.png",
            title: "wintergames-tablet-landscape",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-mobile.png",
            title: "wintergames-mobile",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-portrait1.png",
            title: "wintergames-tablet-portrait",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-landscape1.png",
            title: "wintergames-tablet-landscape",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          header: "5 Weeks of<br />Winter Games",
          primary_action_text: "",
          small_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-mobile.png",
          medium_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-portrait1.png",
          large_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-landscape1.png",
          game: "",
          promotions_legal_text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, pellentesque sagittis tincidunt malesuada condimentum eleifend pretium.",
          subtitle: "PROMOTIONS",
        },
        children: [],
        childSlugs: [],
      },
      "mobile.game-details": {
        id: "28065",
        slug: "game-details",
        title: "Game details",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2015/04/unnamed.png",
            title: "unnamed",
          },
        ],
        custom_fields: {},
        fields: {
          play_button_text: "Play",
          practice_button_text: "Play for fun",
          sign_up_button_text: "Sign up",
          trophies_heading: "Trophies",
          game_in_maintenance_text: "Game in maintenance",
          game_only_on_desktop_text: "Game playable on desktop only",
          all_games_text: "All games",
          critical_for_compliance: false,
          "": false,
          game_reviews_heading_text: "Casino Twitchers Says:",
          temporarily_unavailable: "Temporarily unavailable",
        },
        children: [],
        childSlugs: [],
      },
      "mobile.live-casino-cards-content": {
        id: "84717",
        slug: "mobile.live-casino-cards-content",
        title: "Live Casino Cards Content",
        content: "",
        attachments: [],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          recent_numbers: "Tidigare nummer",
          recent_outcomes: "Recent outcomes",
          open_seats: "Lediga platser",
          table_full: "Fullt bord",
          bet_behind: "Satsa bakom",
          play_now: "Spela nu",
          go_to_lobby: "Gå till lobby",
          recent_letters: "Tidigare bokstäver",
        },
        children: [],
        childSlugs: [],
      },
      "promotions.boosted-reelraces": {
        id: "87088",
        slug: "promotions.boosted-reelraces",
        title: "Boosted Reel Races",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-boostedreelraces.png",
            title: "promotion-boostedreelraces",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/promobadge-boostedreelraces.png",
            title: "promobadge-boostedreelraces",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          dates: "30 Nov 2018 - 6 Jan 2019",
          "": false,
          title: "Boosted Reel Races",
          image:
            "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-boostedreelraces.png",
          teaser_text:
            "Compete against other players for the top spot in our fast-paced tournaments.",
          content_builder: false,
          badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/promobadge-boostedreelraces.png",
          campaign_badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
          cta_text: "Tell me more",
          terms_and_conditions: "",
        },
        children: [],
        childSlugs: [],
      },
      "promotions.must-drop-jackpots": {
        id: "86858",
        slug: "promotions.must-drop-jackpots",
        title: "Must Drop Jackpots",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
            title: "badge-wintergames",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-mustdropjackpots.png",
            title: "promotion-mustdropjackpots",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/flowers.jpeg",
            title: "flowers",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/Group-1.png",
            title: "Group (1)",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/Group-2.png",
            title: "Group (2)",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/Group-3.png",
            title: "Group (3)",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/10/Group-4.png",
            title: "Group (4)",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          dates: "30 Nov 2018 - 6 Jan 2019",
          "": false,
          title: "Must Drop Jackpots",
          image:
            "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-mustdropjackpots.png",
          teaser_text:
            "Play Red Tiger slot games for a chance to win juicy jackpots that drop randomly according to amount or time triggers.",
          content_builder: [
            {
              acf_fc_layout: "text_block",
              text:
                "&lt;p&gt;From the 30 Nov to 6 Jan you&#039;re in for a treat with our exclusive Must Drop Jackpots. Play for real money from a selection of popular slot games for a chance to win a jackpot every hour (up to €1000), a jackpot every day or a Mega Jackpot bringing you thousands of euros. Simply log in to your account, select Must Drop Jackpots, find a slot you like and . . . spin!&lt;/p&gt;",
            },
            {
              acf_fc_layout: "thumbnail_list",
              items: [
                {
                  thumbnail:
                    "https://cms.casumo.com/wp-content/uploads/2018/10/Group-1.png",
                  title: "Daily Drop Jackpot",
                  text:
                    "The daily jackpot must drop before the end of the day.",
                },
                {
                  thumbnail:
                    "https://cms.casumo.com/wp-content/uploads/2018/10/Group-3.png",
                  title: "Must Drop Jackpot",
                  text: "This jackpot could drop anytime between 0 and €1,000.",
                },
                {
                  thumbnail:
                    "https://cms.casumo.com/wp-content/uploads/2018/10/Group-2.png",
                  title: "Mega Drop Jackpot",
                  text: "The biggest pot in the game is a progressive jackpot.",
                },
              ],
            },
            {
              acf_fc_layout: "text_block",
              text:
                "The actual value at which these jackpots will drop is completely random and cannot be predicted.",
            },
            {
              acf_fc_layout: "must_drop_jackpots",
            },
            {
              acf_fc_layout: "text_block",
              text:
                "Play any of the games shown below, to participate in each of the jackpot drops.",
            },
            {
              acf_fc_layout: "game_list",
              games: ["break-away", "fruit-o-matic", "kiss-of-luck"],
            },
          ],
          cta_text: "Tell me more",
          badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/Group-4.png",
          terms_and_conditions:
            "<p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>\r\n<ul>\r\n<li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>\r\n<li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit.</li>\r\n<li>Any prizes will be credited to winning players’ accounts within 48 hours.</li>\r\n<li>By entering this Promotion, all participants will be deemed to have accepted these terms and conditions. </li>\r\n<li>All Casumo General Terms and Conditions apply in conjunction with these Terms and Conditions.</li>\r\n</ul>\r\n<p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>",
          campaign_badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
        },
        children: [],
        childSlugs: [],
      },
      "promotions.big-giveaway": {
        id: "88163",
        slug: "promotions.big-giveaway",
        title: "The Big Giveaway",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/promotion-thebiggiveaway.jpg",
            title: "promotion-thebiggiveaway",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          dates: "1 Dec - 23 Dec 2018",
          badge:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promotionbadge-mysteryprizes.png",
          campaign_badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
          title: "The Big Giveaway",
          image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promotion-thebiggiveaway.jpg",
          teaser_text:
            "€200,000 worth of cash is up for grabs in 3 weekly raffles.",
          cta_text: "Tell me more",
          terms_and_conditions: "",
          content_builder: false,
        },
        children: [],
        childSlugs: [],
      },
      "promotions.mystery-prizes": {
        id: "88194",
        slug: "promotions.mystery-prizes",
        title: "Mystery Prizes",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/promotionbadge-mysteryprizes.png",
            title: "promotionbadge-mysteryprizes",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/promobadge-mysteryprizes.png",
            title: "promobadge-mysteryprizes",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          dates: "3 Dec  - 9 Dec 2018",
          badge:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promotionbadge-mysteryprizes.png",
          campaign_badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
          title: "Mystery Prizes",
          image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promobadge-mysteryprizes.png",
          teaser_text: "",
          cta_text: "Tell me more",
          terms_and_conditions: "",
          content_builder: false,
        },
        children: [],
        childSlugs: [],
      },
      "promotions.christmas-countdown": {
        id: "88210",
        slug: "promotions.christmas-countdown",
        title: "Christmas Countdown",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/promotion-christmascountdown.png",
            title: "promotion-christmascountdown",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          dates: "17 Dec  - 30 Dec 2018",
          badge:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promotionbadge-mysteryprizes.png",
          campaign_badge:
            "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
          title: "Christmas Countdown",
          image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/promotion-christmascountdown.png",
          teaser_text:
            "Play a selection of online slots and double your chances of winning. There&#039;s a total cash pool of €230,000 up for grabs, with 5000+ prizes dropping randomly.",
          cta_text: "Tell me more",
          terms_and_conditions: "",
          content_builder: false,
        },
        children: [],
        childSlugs: [],
      },
      "must-drop-jackpots": {
        id: "88498",
        slug: "must-drop-jackpots",
        title: "Must Drop Jackpots",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/Daily-Drop.svg",
            title: "Daily Drop",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/Must-Drop.svg",
            title: "Must Drop",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg",
            title: "Full round black container",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          title: "Must drop jackpots",
          "": false,
          all_games_cta_text: "See games",
          jackpots: [
            {
              label: "Pays before 1AM",
              image:
                "https://cms.casumo.com/wp-content/uploads/2018/11/Daily-Drop.svg",
              id: "31001",
            },
            {
              label: "Pays before €1000",
              image:
                "https://cms.casumo.com/wp-content/uploads/2018/11/Must-Drop.svg",
              id: "31002",
            },
            {
              label: "Progressive Jackpot",
              image:
                "https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg",
              id: "31003",
            },
          ],
        },
        children: [],
        childSlugs: [],
      },
      "built-pages.top-lists-gb_en": {
        id: "87740",
        slug: "top-lists-gb_en",
        title: "Top Lists gb_en",
        content: "",
        attachments: [],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          "": false,
          more_link: "See more",
          content_builder: [
            { acf_fc_layout: "CURATED_CARD" },
            { acf_fc_layout: "GAMES_LIST", id: "latestPlayedGames" },
            { acf_fc_layout: "GAMES_LIST", id: "popularGames" },
            { acf_fc_layout: "GAMES_LIST", id: "newGames" },
            {
              acf_fc_layout: "PROMOTION_CARDS_HORIZONTAL",
              slug: "campaigns.winter-games",
              title: "All Promotions",
              titleColor: "white",
              backgroundColor: "blue",
            },
            { acf_fc_layout: "GAMES_LIST", id: "exclusiveGames" },
            { acf_fc_layout: "GAMES_LIST", id: "casumoFavouriteGames" },
            { acf_fc_layout: "GAMES_LIST", id: "liveCasinoGames" },
            { acf_fc_layout: "JACKPOTS" },
          ],
        },
        children: [],
        childSlugs: [],
      },
      "adventure-vocas": {
        "id": "101226",
        "slug": "adventure-vocas",
        "title": "Adventure vocas",
        "content": "",
        "attachments": [],
        "custom_fields": {},
        "fields": {
          "critical_for_compliance": false,
          "progression_label_standard": "<strong>{{progression}}% completed</strong> to next level",
          "progression_label_bonus": "<strong>{{progression}}% completed</strong>",
          "level_label": "Level {{level}}",
          "bonus_mode_label": "Bonus mode",
          "max_level_label": "Max level"
        },
        "children": [],
        "childSlugs": []
      },
    },
    reelRaces: {
      "edc71c70-56d6-11e9-8587-0242ac11000b": {
        "tournamentId": "edc71c70-56d6-11e9-8587-0242ac11000b",
        "startTime": now + THIRTY_MINUTES,
        "endTime": now + THIRTY_MINUTES * 2,
        "minbet": null,
        "prize": "€20",
        "gameSlug": "tiki-fruits",
        "spins": 200,
        "color": "yellow-light-1",
        "promoted": false
      },
      "c21ee900-560d-11e9-8587-0242ac11000b": {
        "tournamentId": "c21ee900-560d-11e9-8587-0242ac11000b",
        "startTime": now + THIRTY_MINUTES * 2,
        "endTime": now + THIRTY_MINUTES * 3,
        "minBet": null,
        "prize": "€100",
        "gameSlug": "white-rabbit",
        "spins": 475,
        "color": "yellow-light-1",
        "promoted": false
      },
      "f05408e0-56d6-11e9-8587-0242ac11000b": {
        "tournamentId": "f05408e0-56d6-11e9-8587-0242ac11000b",
        "startTime": now + THIRTY_MINUTES * 3,
        "endTime": now + THIRTY_MINUTES * 4,
        "minBet": null,
        "prize": "€50",
        "gameSlug": "fat-rabbit",
        "spins": 600,
        "color": "yellow-light-1",
        "promoted": false
      },
      "c1c1fbf0-560d-11e9-8587-0242ac11000b": {
        "tournamentId": "c1c1fbf0-560d-11e9-8587-0242ac11000b",
        "startTime": now + THIRTY_MINUTES * 4,
        "endTime": now + THIRTY_MINUTES * 5,
        "minBet": null,
        "prize": "€50",
        "gameSlug": "mega-fortune-dreams",
        "spins": 350,
        "color": "yellow-light-1",
        "promoted": false
      },
      "c1f9fbe0-560d-11e9-8587-0242ac11000b": {
        "tournamentId": "c1f9fbe0-560d-11e9-8587-0242ac11000b",
        "startTime": now + THIRTY_MINUTES * 5,
        "endTime": now + THIRTY_MINUTES * 6,
        "minBet": null,
        "prize": "€1000",
        "gameSlug": "the-tales-of-dr-dolittle",
        "spins": 350,
        "color": "yellow-light-1",
        "promoted": true
      }
    },
    transactionsBetsHistoryAnnualOverview: {
      2018: {
        currency: "GBP",
        betsAmount: 11.4,
        winningsAmount: 33,
        depositsAmount: 4.5,
        withdrawalsAmount: 78,
        awardedBonusesAmount: 99,
        convertedBonusesAmount: 20.2,
      },
      2017: {
        currency: "GBP",
        betsAmount: 9.4,
        winningsAmount: 1,
        depositsAmount: 76,
        withdrawalsAmount: 9,
        awardedBonusesAmount: 100,
        convertedBonusesAmount: 100,
      }
    }
  },
});

export default getStateMock();
