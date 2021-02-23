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
});
