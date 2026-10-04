import { Inter, JetBrains_Mono, Unbounded } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
  // Decorative accents only; not worth competing with the body font for early bandwidth.
  preload: false,
});

export const fontVariables = [inter.variable, unbounded.variable, jetbrains.variable].join(" ");
