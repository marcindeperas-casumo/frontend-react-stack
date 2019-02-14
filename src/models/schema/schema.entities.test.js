import { omit } from "ramda";
import { normalizeData } from "./schema.entities";

describe("CMS Schema", () => {
  test("should normalize a CMS object", () => {
    const sample = {
      id: "123123",
      slug: "sample-slug",
      title: "foo",
      content: "",
      attachments: [],
      custom_fields: { "qtrans_meta:description": "", "qtrans_meta:title": "" },
      fields: {
        image: false,
        logo:
          "https://cms.casumo.com/wp-content/uploads/2015/07/payment-method-e-pro.png",
        logo_background:
          "https://cms.casumo.com/wp-content/uploads/2015/07/payment-method-e-pro-background.png",
        critical_for_compliance: false,
        related_issues: false,
      },
      children: [],
      childSlugs: [],
    };
    const normalized = normalizeData({ cms: sample });

    expect(normalized.entities.cms[sample.slug]).toEqual(sample);
  });

  test("should normalize Game object", () => {
    const game = {
      id: "1b7e",
      providerId: "0c90",
      slug: "300-shields",
      title: "300 Shields",
      description: "",
      jackpotId: null,
      liveCasinoId: null,
      logo:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300Shields-BellyLogo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300-shields_bg.jpg",
      hasPlayForFun: true,
      inMaintenance: false,
      categories: ["SLOT_MACHINE"],
      media: [],
    };
    const normalized = normalizeData({ game });

    expect(
      omit(["name", "logoBackground"], normalized.entities.game[game.slug])
    ).toEqual(game);
    expect(normalized.entities.game[game.slug].name).toEqual(game.title);
    expect(normalized.entities.game[game.slug].logoBackground).toEqual(
      game.backgroundImage
    );
  });
});
