import type { SVGProps } from "react";

/** Stroke icons drawn on a 24×24 grid; size and colour come from `className`. */
function StrokeIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
  </StrokeIcon>
);

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </StrokeIcon>
);

export const ArrowUpRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </StrokeIcon>
);

export const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </StrokeIcon>
);

export const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </StrokeIcon>
);

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="m5 12 5 5L20 7" />
  </StrokeIcon>
);

export const PinIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </StrokeIcon>
);

export const CodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" />
  </StrokeIcon>
);

export const TrophyIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M17 6h2a2 2 0 0 1 0 4h-2M7 6H5a2 2 0 0 0 0 4h2" />
  </StrokeIcon>
);

export const TerminalIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m7 9 3 3-3 3m5 0h5" />
  </StrokeIcon>
);

export const FlameIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z" />
  </StrokeIcon>
);

export const FlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
  </StrokeIcon>
);

export const AwardIcon = (props: SVGProps<SVGSVGElement>) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
  </StrokeIcon>
);
