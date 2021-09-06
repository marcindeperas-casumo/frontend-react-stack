import { imageOptimizer } from "./ImageOptimizer";

jest.useFakeTimers();

describe("ImageOptimizer", () => {
  const params = {
    fm: "png",
    mask: "ellipse",
    markscale: 100,
    fit: "crop",
    crop: "top",
    w: 160,
    h: 160,
    markalign: "top center",
  };

  test("should return correct URL for Golden_Osiris", () => {
    const gameThumbnail =
      "https://cms.casumo.com/wp-content/uploads/2020/11/Golden_Osiris_Thumbnail_BG.png";
    const gameLogo =
      "https://cms.casumo.com/wp-content/uploads/2020/11/Golden_Osiris_Thumbnail_Logo.png";
    const completedParams = {
      ...params,
      mark: gameLogo,
    };

    const expected =
      "https://images.casumo.com/2020/11/Golden_Osiris_Thumbnail_BG.png?dpr=1&format=auto&fm=png&mask=ellipse&markscale=100&fit=crop&crop=top&w=160&h=160&markalign=top%20center&mark=https%3A%2F%2Fcms.casumo.com%2Fwp-content%2Fuploads%2F2020%2F11%2FGolden_Osiris_Thumbnail_Logo.png";
    expect(imageOptimizer.getOptimizedUrl(gameThumbnail, completedParams)).toBe(
      expected
    );
  });

  test("should return correct URL for Buffalo_Hunter", () => {
    const gameThumbnail =
      "https://cms.casumo.com/wp-content/uploads/2020/08/Buffalo_Hunter_Thumbnail_BG.png";
    const gameLogo =
      "https://cms.casumo.com/wp-content/uploads/2020/08/Buffalo_Hunter_Thumbnail_Logo.png";
    const completedParams = {
      ...params,
      mark: gameLogo,
    };

    const expected =
      "https://images.casumo.com/2020/08/Buffalo_Hunter_Thumbnail_BG.png?dpr=1&format=auto&fm=png&mask=ellipse&markscale=100&fit=crop&crop=top&w=160&h=160&markalign=top%20center&mark=https%3A%2F%2Fcms.casumo.com%2Fwp-content%2Fuploads%2F2020%2F08%2FBuffalo_Hunter_Thumbnail_Logo.png";
    expect(imageOptimizer.getOptimizedUrl(gameThumbnail, completedParams)).toBe(
      expected
    );
  });
});
