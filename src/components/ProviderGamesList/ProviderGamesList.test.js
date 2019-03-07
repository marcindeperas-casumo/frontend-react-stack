import React from "react";
import { shallow, mount } from "enzyme";
import ProviderGamesList from "Components/ProviderGamesList/ProviderGamesList";
import MockStore from "Components/MockStore/index";

describe("ProviderGamesList", () => {
  test("renders skeleton while loading", () => {
    const rendered = shallow(<ProviderGamesList isLoaded={false} />);
    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("renders error if in maintenance", () => {
    const rendered = shallow(
      <ProviderGamesList provider={{ inMaintenance: true }} />
    );
    expect(rendered.find("ErrorMessage")).toHaveLength(1);
  });

  test("renders error on error message", () => {
    const rendered = shallow(
      <ProviderGamesList error={"Provider doesn't exist"} />
    );
    expect(rendered.find("ErrorMessage")).toHaveLength(1);
  });

  test("calls fetchGames() on mount", () => {
    const mock = jest.fn();
    shallow(<ProviderGamesList fetchGames={mock} />);
    expect(mock).toHaveBeenCalled();
  });

  test("renders provider name and games", () => {
    const provider = {
      inMaintenance: false,
      name: "nyx",
      games: ["bloodsuckers", "easter-island"],
    };
    const state = {
      schema: {
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
        },
      },
    };
    const rendered = mount(
      <MockStore state={state}>
        <ProviderGamesList provider={provider} isLoaded={true} />
      </MockStore>
    );

    expect(
      rendered
        .find("div")
        .find("Text")
        .first()
        .text()
    ).toBe("nyx");

    expect(rendered.find("GameRow")).toHaveLength(2);
  });
});
