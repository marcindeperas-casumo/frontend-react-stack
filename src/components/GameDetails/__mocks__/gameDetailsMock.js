import { T, evolve } from "ramda";

export const gameDetails = {
  game: {
    name: "Book of Dead",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2017/09/book_of_dead_logo.png",
    backgroundImage:
      "https://cms.casumo.com/wp-content/uploads/2016/01/book-of-dead-backplate.jpg",
    slug: "book-of-dead",
    description:
      "Rich Wilde and the Book of Dead is a  5-reel, 10-payline video slot fro developer Play ‘N Go, based on a new storyline with adventurer Rich Wilde.  After previous chapters with Aztec Idols and the Pearls of India, Rich Wilde is back, and his adventures of have led him to the pyramids of Ancient Egypt, where Anubis has opened the gates to the underworld. Rich Wilde and the Book of Dead slot game has a default RTP of 96.21%. and results are generated by an unbiased algorithm.",
    media: [
      {
        type: "image",
        path:
          "https://cms.casumo.com/wp-content/uploads/2017/09/game-compressor.png",
        order: 1,
      },
    ],
    hasPlayForFun: true,
    isInMaintenance: false,
  },
};

export const t = {
  playButtonText: "Play",
  practiceButtonText: "Play for fun",
  gameInMaintenanceText: "Temporarily unavailable",
}

export const gameDetailsInMaintenance = evolve(
  {
    game: {
      isInMaintenance: T,
    },
  },
  gameDetails
);
