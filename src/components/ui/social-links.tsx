import { socials } from "@/config/site";
import { cn } from "@/lib/cn";
import { SocialIcon } from "../icons/social-icon";

type Variant = "pill" | "compact" | "icon";
type Props = { variant?: Variant; className?: string };

const listStyles: Record<Variant, string> = {
  pill: "flex flex-wrap gap-3",
  compact: "grid grid-cols-2 gap-2.5 sm:grid-cols-4",
  icon: "flex flex-wrap gap-3",
};

const linkStyles: Record<Variant, string> = {
  pill: "rounded-xl px-4 py-2.5",
  compact: "justify-center rounded-xl px-3 py-2.5",
  icon: "size-11 justify-center rounded-xl",
};

/**
 * Social profiles. `pill` shows label + handle, `compact` fits all four in one row,
 * `icon` is an icon-only row (the handle moves into the accessible name).
 */
export function SocialLinks({ variant = "pill", className }: Props) {
  return (
    <ul className={cn(listStyles[variant], className)}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="me noopener noreferrer"
            title={`${social.label}: ${social.handle}`}
            aria-label={variant === "icon" ? `${social.label}: ${social.handle}` : undefined}
            className={cn(
              "group flex items-center gap-2.5 border border-line bg-white/5 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/10",
              linkStyles[variant],
            )}
          >
            <SocialIcon
              id={social.id}
              className="size-5 shrink-0 text-muted transition group-hover:text-fg"
            />
            {variant === "pill" && (
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{social.label}</span>
                <span className="font-mono text-xs text-muted">{social.handle}</span>
              </span>
            )}
            {variant === "compact" && <span className="text-sm font-semibold">{social.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
