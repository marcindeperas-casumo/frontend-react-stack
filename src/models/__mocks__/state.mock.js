import AdventurerMock from "Components/AdventureCard/__mocks__/Adventure.json";

const now = Date.now();
const THIRTY_MINUTES = 30 * 60 * 1000;
export const getStateMock = ({ firstDepositDate = null } = {}) => ({
  paymentMethodConfigs: {
    VISA_CARD: {
      profiles: {
        default: {
          limits: {
            deposit: {
              min: 10,
              max: 5000,
            },
            withdraw: {
              min: 10,
              max: 10000,
              fee: 0,
              applicableFee: 0,
            },
          },
          depositFees: {
            percentage: 0,
            fixed: 0,
          },
          defaultDepositAmounts: [25, 50, 100],
          grouping: {
            name: "preferred",
            order: 1,
          },
        },
      },
      mobile: {
        withdraw: {
          disabled: false,
          disabledCountries: ["ca", "ua", "ru"],
        },
        deposit: {
          quick: true,
          nativeQuick: true,
          disabled: false,
          defaultCreate: false,
          disabledCountries: ["be", "ae"],
        },
      },
      desktop: {
        withdraw: {
          disabled: false,
          disabledCountries: ["ca", "ua", "ru"],
        },
        deposit: {
          quick: true,
          disabled: false,
          defaultCreate: false,
          disabledCountries: ["be"],
        },
      },
    },
  },
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
            paymentMethods: [
              {
                deleted: false,
                id: "404748d6-da6f-494a-a63f-5c0d48f886bb",
                identifier: "401200******1112",
                lastUsageTime: 1581412987000,
                name: "Credit/Debit card",
                token: "54195b0d-94d0-485f-91bc-ecd0f51d763a",
                type: "VISA_CARD",
              },
            ],
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
  },
  schema: {
    adventurer: {
      ...AdventurerMock,
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
          log_out_link_text: "Log out",
        },
      },
      "reel-races.reel-race-templates": {
        slug: "reel-races.reel-race-templates",
        fields: {
          spins: "Spins",
          duration: "Duration",
          duration_template: "{{{duration}}} min",
          min_bet: "Min Bet",
          starting_in: "Starting in",
          ending_in: "Ending in",
          opt_in: "Opt In",
          opted_in: "Opted In",
          opted_in_cta_single_game_short: "Play",
          compete_for: "Compete for {{prize}}",
          title: "Reel Races",
          caveat_short: "false",
          prize: "20€",
        },
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
        id: "101226",
        slug: "adventure-vocas",
        title: "Adventure vocas",
        content: "",
        attachments: [],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          progression_label_standard:
            "<strong>{{progression}}% completed</strong> to next level",
          progression_label_bonus:
            "<strong>{{progression}}% completed</strong>",
          level_label: "Level {{level}}",
          bonus_mode_label: "Bonus mode",
          max_level_label: "Max level",
        },
        children: [],
        childSlugs: [],
      },
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
      },
    },
  },
});

export default getStateMock();
