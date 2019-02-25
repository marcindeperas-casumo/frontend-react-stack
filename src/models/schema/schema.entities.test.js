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

  test("should normalize Game object with new props", () => {
    const game = {
      slug: "300-shields",
      title: "300 Shields",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300Shields-BellyLogo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300-shields_bg.jpg",
      hasPlayForFun: true,
      inMaintenance: false,
    };
    const normalized = normalizeData({ game });
    const expected = omit(
      ["name", "logoBackground"],
      normalized.entities.game[game.slug]
    );

    expect(expected).toEqual(game);
    expect(normalized.entities.game[game.slug].name).toEqual(game.title);
    expect(normalized.entities.game[game.slug].logoBackground).toEqual(
      game.backgroundImage
    );
  });

  test("should normalize Game object", () => {
    const game = {
      slug: "300-shields",
      name: "300 Shields",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300Shields-BellyLogo.png",
      logoBackground:
        "https://cms.casumo.com/wp-content/uploads/2016/12/300-shields_bg.jpg",
      hasPlayForFun: true,
      inMaintenance: false,
    };
    const normalized = normalizeData({ game });

    expect(normalized.entities.game[game.slug]).toEqual(game);
  });
});
