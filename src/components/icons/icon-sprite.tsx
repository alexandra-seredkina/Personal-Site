import { heroOrbit, logos } from "@/config/profile";
import { type BrandIconData, symbolId } from "./brand-icon";
import { socialIcons } from "./social-icon";

const sprite: BrandIconData[] = [
  ...new Map(
    [...logos.map((tech) => tech.icon), ...heroOrbit, ...Object.values(socialIcons)].map((icon) => [
      icon.slug,
      icon,
    ]),
  ).values(),
];

/** Every brand logo used on the site, defined once and referenced by `<BrandIcon>`. */
export function IconSprite() {
  return (
    <svg aria-hidden="true" className="hidden">
      <defs>
        {sprite.map((icon) => (
          <symbol key={icon.slug} id={symbolId(icon)} viewBox="0 0 24 24">
            <path d={icon.path} />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
