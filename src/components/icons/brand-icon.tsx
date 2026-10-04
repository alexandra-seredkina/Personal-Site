import type { SimpleIcon } from "simple-icons";

export type BrandIconData = Pick<SimpleIcon, "slug" | "title" | "path" | "hex">;

export const symbolId = (icon: Pick<BrandIconData, "slug">) => `si-${icon.slug}`;

type Props = {
  icon: BrandIconData;
  className?: string;
  /** Use the official brand colour (dark brand colours fall back to `currentColor`). */
  colored?: boolean;
};

/** Perceived luminance (0–1) of a 6-digit hex colour. */
function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map(
    (i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * References a logo from the page-wide sprite (`IconSprite`), so each path is sent once
 * no matter how many times the logo appears.
 */
export function BrandIcon({ icon, className, colored = false }: Props) {
  const fill = colored && luminance(icon.hex) > 0.18 ? `#${icon.hex}` : "currentColor";
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} aria-hidden="true">
      <use href={`#${symbolId(icon)}`} />
    </svg>
  );
}
