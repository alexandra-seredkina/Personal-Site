/**
 * Anime character artwork: one transparent WebP per pose (`public/character/<pose>.webp`),
 * optionally with a second, pixel-aligned frame that is animated on top of it.
 * Files are generated from `assets/character-source/` by `scripts/character/matte.py`;
 * dimensions must match the exported files.
 */

/** CSS animation applied to the overlay frame (see `--animate-frame-*` in globals.css). */
export type FrameAnimation = "blink" | "wave" | "type" | "think";

type Pose = {
  src: string;
  width: number;
  height: number;
  frame?: { src: string; animation: FrameAnimation };
};

export const character = {
  hero: {
    src: "/character/hero.webp",
    width: 408,
    height: 750,
    frame: { src: "/character/hero-blink.webp", animation: "blink" },
  },
  wave: {
    src: "/character/wave.webp",
    width: 517,
    height: 738,
    frame: { src: "/character/wave-2.webp", animation: "wave" },
  },
  laptop: {
    src: "/character/laptop.webp",
    width: 594,
    height: 750,
    frame: { src: "/character/laptop-2.webp", animation: "type" },
  },
  reading: {
    src: "/character/reading.webp",
    width: 599,
    height: 746,
    frame: { src: "/character/reading-2.webp", animation: "think" },
  },
  lost: { src: "/character/lost.webp", width: 337, height: 736 },
} as const satisfies Record<string, Pose>;

export type CharacterPose = keyof typeof character;
