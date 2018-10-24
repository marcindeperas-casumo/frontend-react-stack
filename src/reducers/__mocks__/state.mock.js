export default {
  migrationComponents: {
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
    "CMS/FETCH_PAGE_BY_SLUG-curated-component": {
      error: null,
      isFetching: false,
    },
    "CMS/FETCH_PAGE_BY_SLUG-mobile.live-casino-cards-content": {
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
          "vi",
          "re",
          "cy",
          "sn",
          "tm",
          "af",
          "ug",
          "bg",
          "tj",
          "dz",
          "kp",
          "ad",
          "qa",
          "ng",
          "so",
          "er",
          "bl",
          "cf",
          "as",
          "lk",
          "vu",
          "tw",
          "aq",
          "pk",
          "jp",
          "tf",
          "gm",
          "zw",
          "at",
          "iq",
          "gp",
          "ma",
          "it",
          "me",
          "pt",
          "ne",
          "mp",
          "si",
          "ly",
          "gu",
          "eg",
          "ss",
          "cm",
          "mk",
          "um",
          "al",
          "hk",
          "rs",
          "mm",
          "cz",
          "gl",
          "ae",
          "mq",
          "fo",
          "kr",
          "ag",
          "gf",
          "tn",
          "sd",
          "tr",
          "bv",
          "uz",
          "la",
          "sy",
          "gr",
          "sl",
          "id",
          "__",
          "ir",
          "lt",
          "fr",
          "pf",
          "hu",
          "cc",
          "us",
          "nf",
          "mo",
          "cn",
          "il",
          "hm",
          "pm",
          "md",
          "ro",
          "ph",
          "nc",
          "eh",
          "gy",
          "cd",
          "be",
          "es",
          "ci",
          "cx",
          "ee",
          "yt",
          "vg",
          "ps",
          "sk",
          "lr",
          "mf",
          "au",
          "wf",
          "pw",
          "ao",
          "ye",
          "gh",
          "sg",
          "va",
          "pr",
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
          de: "524f839d608db6c13e39bc75cb572b6b",
          no: "4adb32d04e2ab7ed870fa3c995bd45cc",
          fi: "6229881129e1bb6d193600a12ce9eb10",
          sv: "a8c4e37b517193679c3b0cf782dc97a4",
          dk: "c8c6bff6de25dd4593f16f8b887ccc77",
          en: "12cc07af03e28d2a7648bb25f44cb6c8",
          gb: "ef8ff5e7cd2f7b3d706242728ddcf8f0",
          ca: "1463b9819e2d0e7caaaa0e2b9f9d9f75",
        },
        marketHashes: {
          fi_fi: {
            fi: "98ade2369f7e2736114cf57e5e88e391",
          },
          se_sv: {
            sv: "2c9331cf4be534443d0dc12331cad742",
          },
          gb_en: {
            gb: "6de95b33a44d87c4ab9537626d68c529",
          },
          dk_da: {
            dk: "8193478cc84ab0a46c492d458da48a8a",
          },
          ca_en: {
            ca: "03edaf341d6da25c8c824b12a4947219",
          },
          no_no: {
            no: "7dd035bd1a540fe88f33f6ea70ff7aeb",
          },
          ___en: {
            en: "95d645fc07dc2163e75236526e9548e6",
          },
          de_de: {
            de: "c699489e88d4e1c39efa1746d72d41b7",
          },
        },
        contentOverrides: {},
      },
      "common/composition/session": {
        roles: ["player"],
        id: "f5d7ccc0-6979-11e8-aea8-0242ac11000b",
        sessionId: "194a325a-ddb1-469a-84af-c38f73703b14",
      },
      "common/ABTesting": {
        testSubjectId: "358d7817-6bca-4cdb-b8bb-83e0bd921b52",
        features: [
          {
            name: "mobile-deposit-type-amount-button",
            flavour: "textual-button",
          },
          {
            name: "desktop-new-game-browser-main-nav-button",
            flavour: "default",
          },
          {
            name: "mobile-registration-country-step",
            flavour: "with-promoted-country",
          },
          {
            name: "mobile-welcome-offer-copy",
            flavour: "variation-c",
          },
          {
            name: "iframe-registration",
            flavour: "default",
          },
          {
            name: "desktop-start-page-banner-image",
            flavour: "default",
          },
          {
            name: "mobile-stack-poc",
            flavour: "react-stack",
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
            flavour: "new-version",
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
            flavour: "new-game-browser-button",
          },
          {
            name: "uk-header-template-test2",
            flavour: "uk-header-template-new-styling",
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
            flavour: "with-filters",
          },
          {
            name: "mobile-deposit-cta",
            flavour: "new-version",
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
          "f5d7ccc0-6979-11e8-aea8-0242ac11000b": {
            playerId: "f5d7ccc0-6979-11e8-aea8-0242ac11000b",
            casumoName: "choen",
            jurisdiction: "UKGC",
            wallet: {
              id: "f6676290-6979-11e8-aea8-0242ac11000b",
              balance: {
                amount: 191.58,
                iso4217CurrencyCode: "GBP",
              },
              depositsBlocked: false,
              withdrawalsBlocked: false,
            },
            contactInfo: {
              name: {
                firstName: "cho",
                lastName: "garcia",
              },
              email: "cho.garcia+en@casumo.com",
              phoneNumber: {
                prefix: "+44",
                number: "7851946679",
              },
              socialSecurityNumber: "",
              dateOfBirth: 532220400000,
              gender: "MALE",
              primaryAddress: {
                country: "gb",
                addressLines: {
                  zip: "N4 4PD",
                  city: "LONDON",
                  street: "1 Beatrice Road",
                },
              },
              nationality: "es",
              pendingEmailValidation: null,
            },
            configuration: {
              language: "en",
              subscribedToNewsletters: false,
              adventurerPublic: true,
              emailOnlyAuthentication: false,
              contactByPhone: false,
              contactByPost: false,
              withdrawalNotifications: false,
              subscribedToSMSNewsletters: false,
            },
            referrerInfo: {
              offerId: "no-offer-id",
              targetCampaignId: null,
              metadata: {
                source: "https://site.dev/",
              },
              referrer: "SEO",
            },
            registrationDate: 1528283318000,
            firstDepositDate: null,
            bonus: null,
            blocked: false,
            market: "gb_en",
            activeDepositBonus: null,
            notifications: [],
            mandatoryMessages: [],
            paymentMethods: [],
            changePasswordTicketId: null,
            welcomeOfferId: "wo-100depbonusmax300-20fsstarburstonreg",
            suspiciousAccount: false,
            failedLogins: 0,
            latestPlayedGameIds: [],
            phoneNumberVerified: true,
            phoneNumberVerificationCodeRequestTimes: 0,
            playerTournamentCampaign: {
              hasParticipatedInTournaments: true,
              tournaments: {},
            },
            tournamentCampaign: {
              campaignId: "notUsed",
              tournaments: {
                "0c450e40-d1b8-11e8-b475-0242ac110004": {
                  tournamentId: "0c450e40-d1b8-11e8-b475-0242ac110004",
                  status: "Started",
                  type: "Promoted",
                  campaignId: "casumo_promoted_bbw",
                  contentId: "default",
                  startTime: 1540404000000,
                  endTime: 1540407000000,
                  minBetByCurrency: {
                    EUR: 0.5,
                    GBP: 0.5,
                    CAD: 1,
                    DKK: 5,
                    SEK: 5,
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
                          '{"amount":1000.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":250.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":100.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":50.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":50.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                  ],
                  gameConfiguration: {
                    gamesAreInclusive: true,
                    gameNames: ["relax-bbw"],
                  },
                  leaderboard: {},
                  spinLimit: 400,
                  winner: null,
                  numberOfParticipants: 0,
                  promoted: true,
                },
                "36d67a80-d281-11e8-b475-0242ac110004": {
                  tournamentId: "36d67a80-d281-11e8-b475-0242ac110004",
                  status: "Scheduled",
                  type: "Promoted",
                  campaignId: "casumo_promoted_mfd",
                  contentId: "default",
                  startTime: 1540490400000,
                  endTime: 1540493400000,
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
                          '{"amount":1000.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":250.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":100.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":50.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":50.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                  ],
                  gameConfiguration: {
                    gamesAreInclusive: true,
                    gameNames: [
                      "netent-megafortunedreams_mobile_html_sw",
                      "netent-megafortunedreams_not_mobile_sw",
                      "netent-megafortunedreams_sw",
                    ],
                  },
                  leaderboard: {},
                  spinLimit: 400,
                  winner: null,
                  numberOfParticipants: 0,
                  promoted: true,
                },
                "0c57abe0-d1b8-11e8-b475-0242ac110004": {
                  tournamentId: "0c57abe0-d1b8-11e8-b475-0242ac110004",
                  status: "Scheduled",
                  type: "Standard",
                  campaignId: "casumo_high_activity_bookofdead",
                  contentId: "default",
                  startTime: 1540409400000,
                  endTime: 1540410600000,
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
                        "tournament_75_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":75.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":50.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":25.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
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
                          '{"amount":10.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
                      },
                    },
                    {
                      badgeRuleName:
                        "tournament_5_free-money|slug=free-money-template",
                      serializedItemUsables: [
                        {
                          usableClassName: "FreeMoneyUsableUsedEvent",
                          usableJSON: "{}",
                        },
                      ],
                      templateParameterValues: {
                        amountGiven:
                          '{"amount":5.0000,"iso4217CurrencyCode":"GBP"}',
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
                "relax-eden",
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
                "/public",
              ],
            },
            featureFlags: ["AML_FLOW_17608", "MOBILE_VERIFICATION"],
            complianceState: {},
            emailVerified: true,
            extentOfGambling: null,
            testPlayer: false,
          },
        },
      },
    },
    games: {
      topListsTitle: "Top lists",
      searchTitle: "Type & search",
      topListIds: [
        "latestPlayedGames",
        "popularGames",
        "liveCasinoGames",
        "newGames",
        "exclusiveGames",
        "casumoFavouriteGames",
        "casumoJackpotGames",
      ],
      gamesLists: {
        exclusiveGames: {
          id: "exclusiveGames",
          title: "Only At Casumo",
          image: "",
          variants: {
            default: {
              totalGames: 5,
              hash: "988a00d91b2fc4251513a03d657d27dd",
            },
            guests: {
              totalGames: 4,
              hash: "d563481ff5b3fa70bfd22cdd87c50807",
            },
            includeDisabled: {
              totalGames: 8,
              hash: "3331506114a6290b2d8762db5d981bdd",
            },
          },
        },
        latestPlayedGames: {
          id: "latestPlayedGames",
          title: "Last Played",
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
          title: "All Games",
          image: "",
          variants: {
            default: {
              totalGames: 962,
              hash: "d59af17c3ae7ec3ec194bdd23bc1ebe6",
            },
            guests: {
              totalGames: 867,
              hash: "a9c53368ebd1ca9caef456c398ee1cd5",
            },
            includeDisabled: {
              totalGames: 1304,
              hash: "122714c76bf6296892a3d80ae37d62ca",
            },
          },
        },
        casumoFavouriteGames: {
          id: "casumoFavouriteGames",
          title: "Casumo Loves",
          image: "",
          variants: {
            default: {
              totalGames: 33,
              hash: "f30ee878ad2af4324046c6767d7bc7a3",
            },
            guests: {
              totalGames: 27,
              hash: "23ea03e769965d7937cff5f5535e07b9",
            },
            includeDisabled: {
              totalGames: 35,
              hash: "bf1fe799d985cc5810c1495b123ee15d",
            },
          },
        },
        liveCasinoGames: {
          id: "liveCasinoGames",
          title: "Live Casino",
          image: "",
          variants: {
            default: {
              totalGames: 8,
              hash: "1d4a802f331653ebd9bdc24bd8070e58",
            },
            guests: {
              totalGames: 8,
              hash: "1d4a802f331653ebd9bdc24bd8070e58",
            },
            includeDisabled: {
              totalGames: 12,
              hash: "9e7a9d338c4a0d778460788c8ad8fdf6",
            },
          },
        },
        casumoJackpotGames: {
          id: "casumoJackpotGames",
          title: "Jackpots",
          image: "",
          variants: {
            default: {
              totalGames: 10,
              hash: "4f3128b9286222f6b6fab1b99388fc3a",
            },
            guests: {
              totalGames: 10,
              hash: "4f3128b9286222f6b6fab1b99388fc3a",
            },
            includeDisabled: {
              totalGames: 14,
              hash: "c11d902cff6912c1d6d5293951bbe734",
            },
          },
        },
        newGames: {
          id: "newGames",
          title: "New Games",
          image: "",
          variants: {
            default: {
              totalGames: 72,
              hash: "164568d4de69dd28c95f25164aa80a17",
            },
            guests: {
              totalGames: 71,
              hash: "5f66d81f2935cd8d867caa0d5266f799",
            },
            includeDisabled: {
              totalGames: 95,
              hash: "cbb5ac00ba3b686f34de05fae22172c4",
            },
          },
        },
        popularGames: {
          id: "popularGames",
          title: "Popular",
          image: "",
          variants: {
            default: {
              totalGames: 21,
              hash: "33eced366ce41e74dbcf8c8991fd1d78",
            },
            guests: {
              totalGames: 18,
              hash: "de8b9efc3e55c4e339f5ed0dec8cf726",
            },
            includeDisabled: {
              totalGames: 23,
              hash: "74fe302bc5d8d43e1d0411f881d6ac67",
            },
          },
        },
      },
    },
  },
  schema: {
    game: {
      "halloween-jack": {
        name: "Halloween Jack",
        slug: "halloween-jack",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/halloweenjack-bg-tb.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/halloweenjack-logo.png",
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
      "wild-times": {
        name: "Wild Times",
        slug: "wild-times",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/06/wild-things-game-bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/06/wild-things-game-thumb-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "reel-king": {
        name: "Reel King",
        slug: "reel-king",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2016/06/reel_king_bg.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2016/06/reel_king_logo.png",
        hasPlayForFun: false,
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
        jackpotId: null,
        tableId: "munbzmuueehqaavs",
        lobby: "munbzmuueehqaavs",
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
        jackpotId: null,
        tableId: "UTHTable00000001",
        lobby: "UTHTable00000001",
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
        jackpotId: null,
        tableId: "TopCard000000001",
        lobby: "TopCard000000001",
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
        jackpotId: null,
        tableId: "MOWDream00000001",
        lobby: "MOWDream00000001",
      },
      "zombie-circus": {
        name: "Zombie Circus",
        slug: "zombie-circus",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/zombie_circus_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/zombie_circus_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "dark-vortex": {
        name: "Dark Vortex",
        slug: "dark-vortex",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/dark_vortex_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/dark_vortex_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "romanov-riches": {
        name: "Romanov Riches",
        slug: "romanov-riches",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/romanov_riches_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/romanov_riches_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "wild-bazaar": {
        name: "Wild Bazaar",
        slug: "wild-bazaar",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_bazaar_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/wild_bazaar_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "mermaids-queen": {
        name: "Mermaid Queen",
        slug: "mermaids-queen",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/mermaid_queen_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/mermaid_queen_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "quick-hit-ultra-pays-sun-dragon": {
        name: "Quick Hit Ultra Pays Sun Dragon",
        slug: "quick-hit-ultra-pays-sun-dragon",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/sun_dragon_thumbnail1.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/sun_dragon_logo1.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "vegas-magic": {
        name: "Vegas Magic",
        slug: "vegas-magic",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/vegas_magic_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/vegas_magic_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "buffalo-rising-megaways": {
        name: "Buffalo Rising Megaways",
        slug: "buffalo-rising-megaways",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/buffalo_rising_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/buffalo-rising-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      polterheist: {
        name: "Polterheist",
        slug: "polterheist",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/polter_heist_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/polter_heist_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "tales-of-darkness-full-moon": {
        name: "Tales of Darkness &#8211; Full Moon",
        slug: "tales-of-darkness-full-moon",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/tod_full_moon-thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/tod_full_moon_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "van-gogh": {
        name: "Van Gogh",
        slug: "van-gogh",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/10/van_gogh_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/10/van_gogh_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "cash-of-kingdoms": {
        name: "Cash Of Kingdoms",
        slug: "cash-of-kingdoms",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/cash_of_kingodms_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/cash_of_kingodms_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "tales-of-darkness-break-of-dawn": {
        name: "Tales of Darkness &#8211; Break Of Dawn",
        slug: "tales-of-darkness-break-of-dawn",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/tod_break_of_dawn_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/tod_break_of_dawn_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "monopoly-big-money-reel": {
        name: "Monopoly Big Money Reel",
        slug: "monopoly-big-money-reel",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/monopoly_big_money_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/monopoly_big_money_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "coins-of-egypt": {
        name: "Coins Of Egypt",
        slug: "coins-of-egypt",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/coins_of_egypt_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/coins_of_egypt_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "ark-of-mystery": {
        name: "Ark of Mystery",
        slug: "ark-of-mystery",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/ark-of-mystery-bgtm.png",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/ark-of-mystery-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "iron-girl": {
        name: "Iron Girl",
        slug: "iron-girl",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/iron_girl_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/iron_girl_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "tales-of-darkness-lunar-eclipse": {
        name: "Tales of Darkness &#8211; Lunar Eclipse",
        slug: "tales-of-darkness-lunar-eclipse",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/tod_lunar_eclipse_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/tod_lunar_eclipse_logo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "erik-the-red": {
        name: "Erik The Red",
        slug: "erik-the-red",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/09/erik_the_red_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/09/erik_the_red_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
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
      "kingdom-of-fortune": {
        name: "Kingdom Of Fortune",
        slug: "kingdom-of-fortune",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/07/back-kingdomoffortune.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/07/logo-kingdomoffortune1.png",
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
      "blood-suckers-ii": {
        name: "Blood Suckers II",
        slug: "blood-suckers-ii",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/10/blood_suckers_2_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/10/blood_suckers_2_logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      "happy-halloween": {
        name: "Happy Halloween",
        slug: "happy-halloween",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2015/12/happy-halloween_game-thumb-plate.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/12/happy-halloween-logo.png",
        hasPlayForFun: true,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: null,
      },
      halloween: {
        name: "Halloween",
        slug: "halloween",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2017/10/halloween_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/10/halloween_game_logo.png",
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
      "pirates-charm": {
        name: "Pirate&#8217;s Charm",
        slug: "pirates-charm",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/05/pirates_charm_thumbnail.jpg",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/05/pirates_charm_logo.png",
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
    },
    liveTable: {
      munbzmuueehqaavs: {
        tableId: "munbzmuueehqaavs",
        type: "MoneyWheel",
        image: "https://lobbyimages.egcdn.video/thumbnail/csor1_mw_med_L.jpg",
        bets: {
          symbol: "£",
          min: 0.1,
          max: 2500,
        },
        players: 0,
        results: ["20", "01", "02", "01", "05", "01", "20", "05", "02"],
        betBehind: null,
        seats: null,
        provider: "casumo",
      },
      UTHTable00000001: {
        tableId: "UTHTable00000001",
        type: "UTH",
        image: "https://lobbyimages.egcdn.video/thumbnail/pk_uth1_med_L.jpg",
        bets: {
          symbol: "£",
          min: 5,
          max: 600,
        },
        players: 1,
        results: null,
        betBehind: null,
        seats: null,
        provider: "evolution",
      },
      TopCard000000001: {
        tableId: "TopCard000000001",
        type: "TopCard",
        image: "https://lobbyimages.egcdn.video/thumbnail/topcr1_bs_med_L.jpg",
        bets: {
          symbol: "£",
          min: 1,
          max: 15000,
        },
        players: 2,
        results: [
          "L",
          "R",
          "R",
          "S",
          "L",
          "R",
          "L",
          "R",
          "R",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
        ],
        betBehind: null,
        seats: null,
        provider: "evolution",
      },
      MOWDream00000001: {
        tableId: "MOWDream00000001",
        type: "MoneyWheel",
        image: "https://lobbyimages.egcdn.video/thumbnail/dc1_mw_med_L.jpg",
        bets: {
          symbol: "£",
          min: 0.1,
          max: 5000,
        },
        players: 9,
        results: ["10", "01", "10", "02", "05", "40", "01", "01", "01"],
        betBehind: null,
        seats: null,
        provider: "evolution",
      },
    },
    jackpot: {
      "netent-gof_mega": {
        currencyCode: "GBP",
        gameId: "netent-gof_mega",
        formattedJackpotAmount: "£9,846.64",
      },
      "netent-megafortunedreams_mega": {
        currencyCode: "GBP",
        gameId: "netent-megafortunedreams_mega",
        formattedJackpotAmount: "£2,706,683.08",
      },
      "netent-cstud": {
        currencyCode: "GBP",
        gameId: "netent-cstud",
        formattedJackpotAmount: "£8,909.97",
      },
      "netent-cf_major": {
        currencyCode: "GBP",
        gameId: "netent-cf_major",
        formattedJackpotAmount: "£3,910.30",
      },
      "netent-frog1": {
        currencyCode: "GBP",
        gameId: "netent-frog1",
        formattedJackpotAmount: "£113.46",
      },
      "netent-megajackpot2": {
        currencyCode: "GBP",
        gameId: "netent-megajackpot2",
        formattedJackpotAmount: "£6,625.43",
      },
      "netent-megafortunedreams_major": {
        currencyCode: "GBP",
        gameId: "netent-megafortunedreams_major",
        formattedJackpotAmount: "£6,232.36",
      },
      "netent-hrscratchticketjpb": {
        currencyCode: "GBP",
        gameId: "netent-hrscratchticketjpb",
        formattedJackpotAmount: "£44,173.51",
      },
      "netent-horserace": {
        currencyCode: "GBP",
        gameId: "netent-horserace",
        formattedJackpotAmount: "£883.47",
      },
      "netent-megajoker": {
        currencyCode: "GBP",
        gameId: "netent-megajoker",
        formattedJackpotAmount: "£1,880.30",
      },
      "netent-cf_minifix": {
        currencyCode: "GBP",
        gameId: "netent-cf_minifix",
        formattedJackpotAmount: "£441.74",
      },
      "netent-hog_small": {
        currencyCode: "GBP",
        gameId: "netent-hog_small",
        formattedJackpotAmount: "£784.16",
      },
      "netent-megajackpot3": {
        currencyCode: "GBP",
        gameId: "netent-megajackpot3",
        formattedJackpotAmount: "£1,402.65",
      },
      "netent-keno": {
        currencyCode: "GBP",
        gameId: "netent-keno",
        formattedJackpotAmount: "£4,419.98",
      },
      "netent-frog3": {
        currencyCode: "GBP",
        gameId: "netent-frog3",
        formattedJackpotAmount: "£4,534.66",
      },
      "netent-wonder2": {
        currencyCode: "GBP",
        gameId: "netent-wonder2",
        formattedJackpotAmount: "£9,483.75",
      },
      "netent-megajackpot1": {
        currencyCode: "GBP",
        gameId: "netent-megajackpot1",
        formattedJackpotAmount: "£1,824,326.17",
      },
      "netent-megafortunedreams_rapid": {
        currencyCode: "GBP",
        gameId: "netent-megafortunedreams_rapid",
        formattedJackpotAmount: "£826.87",
      },
      "netent-arabian": {
        currencyCode: "GBP",
        gameId: "netent-arabian",
        formattedJackpotAmount: "£4,417.35",
      },
      "netent-fishyfortune": {
        currencyCode: "GBP",
        gameId: "netent-fishyfortune",
        formattedJackpotAmount: "£88.35",
      },
      "netent-cf_mega": {
        currencyCode: "GBP",
        gameId: "netent-cf_mega",
        formattedJackpotAmount: "£14,123.12",
      },
      "netent-cashbomb": {
        currencyCode: "GBP",
        gameId: "netent-cashbomb",
        formattedJackpotAmount: "£3,180.49",
      },
      "netent-bingo": {
        currencyCode: "GBP",
        gameId: "netent-bingo",
        formattedJackpotAmount: "£883.47",
      },
      "netent-hrscratchticketjp": {
        currencyCode: "GBP",
        gameId: "netent-hrscratchticketjp",
        formattedJackpotAmount: "£26,504.11",
      },
      "netent-hog_large": {
        currencyCode: "GBP",
        gameId: "netent-hog_large",
        formattedJackpotAmount: "£2,001,713.86",
      },
      "netent-frog2": {
        currencyCode: "GBP",
        gameId: "netent-frog2",
        formattedJackpotAmount: "£488.66",
      },
      "netent-wonder1": {
        currencyCode: "GBP",
        gameId: "netent-wonder1",
        formattedJackpotAmount: "£874.43",
      },
      "netent-goldrush": {
        currencyCode: "GBP",
        gameId: "netent-goldrush",
        formattedJackpotAmount: "£1,272.20",
      },
      "netent-hog_medium": {
        currencyCode: "GBP",
        gameId: "netent-hog_medium",
        formattedJackpotAmount: "£5,351.06",
      },
      "netent-cf_rapidfix": {
        currencyCode: "GBP",
        gameId: "netent-cf_rapidfix",
        formattedJackpotAmount: "£88.35",
      },
      "netent-cf_midi": {
        currencyCode: "GBP",
        gameId: "netent-cf_midi",
        formattedJackpotAmount: "£1,972.72",
      },
      "netent-vault": {
        currencyCode: "GBP",
        gameId: "netent-vault",
        formattedJackpotAmount: "£6,360.99",
      },
    },
    gameList: {
      latestPlayedGames: {
        games: ["halloween-jack", "fruit-warp", "raging-rhino", "jammin-jars"],
        id: "latestPlayedGames",
        title: "Last Played",
      },
      popularGames: {
        games: [
          "book-of-ra-deluxe",
          "diamond-mine",
          "raging-rhino",
          "jammin-jars",
          "legacy-of-egypt",
          "big-bad-wolf",
          "starburst",
          "gemix",
          "danger-high-voltage",
          "88-fortunes",
          "fruit-warp",
          "gonzos-quest",
          "rainbow-riches-pick-n-mix",
          "white-rabbit",
          "action-bank",
          "twin-spin",
          "cleopatra",
          "eastern-emeralds",
          "wild-times",
          "reel-king",
        ],
        id: "popularGames",
        title: "Popular",
      },
      liveCasinoGames: {
        games: [
          "topwheel-treasures",
          "evolution-live-ultimate-texas-holdem",
          "evolution-live-football-studio",
          "dream-catcher",
        ],
        id: "liveCasinoGames",
        title: "Live Casino",
      },
      newGames: {
        games: [
          "zombie-circus",
          "dark-vortex",
          "romanov-riches",
          "wild-bazaar",
          "halloween-jack",
          "mermaids-queen",
          "quick-hit-ultra-pays-sun-dragon",
          "vegas-magic",
          "buffalo-rising-megaways",
          "polterheist",
          "tales-of-darkness-full-moon",
          "van-gogh",
          "cash-of-kingdoms",
          "tales-of-darkness-break-of-dawn",
          "monopoly-big-money-reel",
          "coins-of-egypt",
          "ark-of-mystery",
          "iron-girl",
          "tales-of-darkness-lunar-eclipse",
          "erik-the-red",
        ],
        id: "newGames",
        title: "New Games",
      },
      exclusiveGames: {
        games: [
          "topwheel-treasures",
          "the-tales-of-dr-dolittle",
          "kingdom-of-fortune",
          "casumo-roulette",
          "casumo-blackjack-evolution",
        ],
        id: "exclusiveGames",
        title: "Only At Casumo",
      },
      casumoFavouriteGames: {
        games: [
          "halloween-jack",
          "tales-of-darkness-full-moon",
          "blood-suckers-ii",
          "happy-halloween",
          "halloween",
          "eastern-emeralds",
          "donuts",
          "fat-rabbit",
          "vikings-go-berzerk",
          "reel-rush",
          "dwarfs-gone-wild",
          "reactoonz",
          "sticky-bandits",
          "montezuma",
          "goldilocks",
          "bonanza",
          "pirates-charm",
          "book-of-dead",
          "fire-joker",
          "lucky-ladys-charm-deluxe",
        ],
        id: "casumoFavouriteGames",
        title: "Casumo Loves",
      },
      casumoJackpotGames: {
        games: [
          "mega-fortune-dreams",
          "mega-fortune",
          "hall-of-gods",
          "mega-moolah",
          "divine-fortune",
          "dancing-in-rio",
          "power-force-heroes",
          "monkeys-millions",
          "keystone-kops",
          "jackpot-diamonds",
        ],
        id: "casumoJackpotGames",
        title: "Jackpots",
      },
    },
    cms: {
      "curated-component": {
        id: "85475",
        slug: "curated-component",
        title: "Curated Component",
        content: "",
        attachments: [
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-medium-topwheel2.png",
            title: "cc-medium-topwheel2",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-large-topwheel2.png",
            title: "cc-large-topwheel2",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-small-topwheel2.png",
            title: "cc-small-topwheel2",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-small-starburst.png",
            title: "cc-small-starburst",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-medium-starburst.png",
            title: "cc-medium-starburst",
          },
          {
            url:
              "https://cms.casumo.com/wp-content/uploads/2018/09/cc-large-starburst.png",
            title: "cc-large-starburst",
          },
        ],
        custom_fields: {},
        fields: {
          critical_for_compliance: false,
          small_image:
            "https://cms.casumo.com/wp-content/uploads/2018/09/cc-small-topwheel2.png",
          medium_image:
            "https://cms.casumo.com/wp-content/uploads/2018/09/cc-medium-topwheel2.png",
          large_image:
            "https://cms.casumo.com/wp-content/uploads/2018/09/cc-large-topwheel2.png",
          game: ["topwheel-treasures"],
          header: "TRY OUR<br/> NEW<br/> GAME",
          primary_action_text: "Play",
          active_promotions: ["first-promotion", "second-promotion"],
          promotions_legal_text:
            "<p>Nulla aliquam dictum quam, ut euismod est ornare ac. Phasellus et ipsum sed neque sodales sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla porttitor ornare neque, vitae dignissim ipsum venenatis quis. Nullam eget erat laoreet, aliquam augue nec, rutrum tellus. Nam volutpat rutrum ipsum at convallis. Curabitur tempor malesuada massa, non suscipit turpis fringilla et. Nulla facilisi. Curabitur laoreet arcu tristique, pellentesque nulla sed, sodales augue. Morbi semper mauris quam, auctor eleifend tortor tristique et.</p>\n",
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
          recent_numbers: "Recent numbers",
          open_seats: "Open seats",
          table_full: "Table full",
          bet_behind: "Bet behind",
          play_now: "Play now",
          go_to_lobby: "Go to lobby",
          recent_letters: "Recent letters",
        },
        children: [],
        childSlugs: [],
      },
    },
  },
};
