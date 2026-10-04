import Image from "next/image";
import { type CharacterPose, character, type FrameAnimation } from "@/config/character";
import { cn } from "@/lib/cn";

type Props = {
  pose: CharacterPose;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Artwork is flat illustration with fine lineart; the default q=75 visibly softens it. */
const QUALITY = 90;

const frameAnimations: Record<FrameAnimation, string> = {
  blink: "motion-safe:animate-frame-blink",
  wave: "motion-safe:animate-frame-wave",
  type: "motion-safe:animate-frame-type",
  think: "motion-safe:animate-frame-think",
};

/**
 * Anime-style illustration of Aleksandra. Poses with a second frame stack both images in one
 * grid cell and switch between them via `--frame`; with reduced motion only the base frame shows.
 */
export function Character({ pose, alt, className, priority = false, sizes = "320px" }: Props) {
  const { src, width, height, ...rest } = character[pose];
  const frame = "frame" in rest ? rest.frame : undefined;
  const common = { width, height, sizes, quality: QUALITY } as const;

  if (!frame) {
    return (
      <Image
        src={src}
        alt={alt}
        priority={priority}
        {...common}
        className={cn("pointer-events-none select-none", className)}
      />
    );
  }

  const layer = "col-start-1 row-start-1 size-full object-contain";
  return (
    // The outer box takes the caller's classes (including display utilities such as
    // `hidden sm:block`) and the artwork's aspect ratio, so it sizes like a lone <img>;
    // the inner grid stacks the frames.
    <span
      className={cn("pointer-events-none block select-none", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span className={cn("grid size-full", frameAnimations[frame.animation])}>
        <Image
          src={src}
          alt={alt}
          priority={priority}
          {...common}
          className={cn(layer, "frame-base")}
        />
        <Image
          src={frame.src}
          alt=""
          aria-hidden="true"
          {...common}
          className={cn(layer, "frame-alt")}
        />
      </span>
    </span>
  );
}
