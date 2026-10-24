import type { Spread } from "../issue-scroller/spreads";

// Articles for the home grid. Title, description and alt text live in the
// IssueGrid messages, keyed by `key`; all copy is placeholder.
export const homeStories: readonly (Spread & {
  key: "musicBand" | "artGunesTerkol" | "julianBarnes";
  slug: string;
})[] = [
  {
    src: "/images/home/story-music-band.png",
    width: 1244,
    height: 1699,
    key: "musicBand",
    slug: "music-band",
  },
  {
    src: "/images/home/story-art-gunes-terkol.png",
    width: 673,
    height: 853,
    key: "artGunesTerkol",
    slug: "art-gunes-terkol",
  },
  {
    src: "/images/home/story-julian-barnes.png",
    width: 1241,
    height: 1697,
    key: "julianBarnes",
    slug: "julian-barnes",
  },
];
