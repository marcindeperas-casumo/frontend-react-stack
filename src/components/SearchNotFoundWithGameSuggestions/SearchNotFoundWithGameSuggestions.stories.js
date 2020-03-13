// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";
import { mock } from "./__mock__";

const stories = storiesOf("SearchNotFoundWithGameSuggestions", module);

stories.add("Default", () => (
  <SearchNotFoundWithGameSuggestions
    image={mock.image}
    title={mock.title}
    content={mock.content}
    list={{
      title: "Popular",
      location: "",
      games: [
        {
          id: "c83c8ed0-ba9a-11e5-9a57-005056a03af2",
          backgroundImage:
            "https://cms.casumo.com/wp-content/uploads/2016/01/book-of-dead-backplate.jpg",
          isInMaintenance: false,
          logo:
            "https://cms.casumo.com/wp-content/uploads/2017/09/book_of_dead_logo.png",
          name: "Book of Dead",
          slug: "book-of-dead",
        },
        {
          id: "cd476c51-0842-11e2-b0fd-005056bf4a60",
          backgroundImage:
            "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
          isInMaintenance: false,
          logo:
            "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
          name: "Gonzo’s Quest",
          slug: "gonzos-quest",
        },
        {
          id: "982843d0-3b32-11e9-98b8-0242ac110002",
          backgroundImage:
            "https://cms.casumo.com/wp-content/uploads/2019/02/pirates_plenty_thumbnail.jpg",
          isInMaintenance: false,
          logo:
            "https://cms.casumo.com/wp-content/uploads/2019/02/pirates_plenty_logo.png",
          name: "Pirates Plenty",
          slug: "pirates-plenty",
        },
      ],
    }}
    loading={select("Is Loading", [false, true], false)}
  />
));
