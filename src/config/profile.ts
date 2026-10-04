import {
  type SimpleIcon,
  siBurpsuite,
  siDocker,
  siGitlab,
  siGnubash,
  siJsonwebtokens,
  siKalilinux,
  siLetsencrypt,
  siLinux,
  siMetasploit,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOwasp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSocketdotio,
  siTryhackme,
  siTypescript,
  siWireshark,
} from "simple-icons";

/**
 * Language-independent profile data. Translatable copy lives in `messages/*.json`
 * under the same ids.
 */

export const stats = [
  { id: "years", value: 4, prefix: "", suffix: "+" },
  { id: "rank", value: 2, prefix: "Top ", suffix: "%" },
  { id: "rooms", value: 220, prefix: "", suffix: "" },
  { id: "streak", value: 211, prefix: "", suffix: "" },
] as const;

export type StatId = (typeof stats)[number]["id"];

export type Tech = { name: string; icon?: SimpleIcon };

export const stack = [
  {
    id: "appsec",
    items: [
      { name: "OWASP Top 10", icon: siOwasp },
      { name: "Burp Suite", icon: siBurpsuite },
      { name: "SAST · Semgrep" },
      { name: "SCA & secret detection" },
      { name: "JWT & OAuth", icon: siJsonwebtokens },
      { name: "Postman", icon: siPostman },
    ],
  },
  {
    id: "offensive",
    items: [
      { name: "Kali Linux", icon: siKalilinux },
      { name: "Metasploit", icon: siMetasploit },
      { name: "Wireshark", icon: siWireshark },
      { name: "Nmap" },
      { name: "Active Directory" },
      { name: "TryHackMe", icon: siTryhackme },
    ],
  },
  {
    id: "devsecops",
    items: [
      { name: "GitLab CI/CD", icon: siGitlab },
      { name: "Docker", icon: siDocker },
      { name: "Nginx", icon: siNginx },
      { name: "Linux", icon: siLinux },
      { name: "Bash", icon: siGnubash },
      { name: "Let's Encrypt", icon: siLetsencrypt },
    ],
  },
  {
    id: "development",
    items: [
      { name: "TypeScript", icon: siTypescript },
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "NestJS", icon: siNestjs },
      { name: "Node.js", icon: siNodedotjs },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "WebSockets", icon: siSocketdotio },
      { name: "Python", icon: siPython },
    ],
  },
] as const satisfies readonly { id: string; items: readonly Tech[] }[];

export type StackGroupId = (typeof stack)[number]["id"];

/** Technologies that have a logo — used by the marquee. */
export const logos: Required<Tech>[] = stack
  .flatMap((group) => group.items as readonly Tech[])
  .filter((tech): tech is Required<Tech> => tech.icon !== undefined);

/** Logos floating around the hero character. */
export const heroOrbit = [siBurpsuite, siOwasp, siReact, siKalilinux] as const;

export const experience = [
  {
    id: "dvg",
    company: "DvG Project",
    url: "https://www.dvg-project.com",
    start: "2022-06",
    end: null,
    tags: ["React", "TypeScript", "WebSockets", "AppSec", "DevSecOps", "GitLab CI"],
  },
] as const;

export type ExperienceId = (typeof experience)[number]["id"];

export const education = [{ id: "college", start: "2019", end: "2022" }] as const;

export const certifications = [
  {
    id: "pt1",
    name: "PT1 — Penetration Tester",
    issuer: "TryHackMe",
    issued: "2026-05",
    expires: "2029-05",
    credentialId: "69f5a30b47ac3c1ea4c5a76b",
    href: "https://assets.tryhackme.com/certification-certificate/69f5a30b47ac3c1ea4c5a76b.pdf",
  },
  {
    id: "webfund",
    name: "Web Fundamentals",
    issuer: "TryHackMe",
    issued: "2025-05",
    expires: "2028-11",
    credentialId: "THM-QR2EWBCKM4",
    href: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-QR2EWBCKM4.pdf",
  },
  {
    id: "jrpt",
    name: "Jr Penetration Tester",
    issuer: "TryHackMe",
    issued: "2024-01",
    expires: null,
    credentialId: "THM-45EFJZY1GU",
    href: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-45EFJZY1GU.pdf",
  },
  {
    id: "presec",
    name: "Pre Security",
    issuer: "TryHackMe",
    issued: "2024-01",
    expires: null,
    credentialId: "THM-ZTQGRY5YNZ",
    href: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ZTQGRY5YNZ.pdf",
  },
] as const;

/**
 * CTF competitions; descriptions and results are translated in `messages` under `Ctf.items`.
 * Logos are 150×150 WebP in `public/ctf/` (sources in `assets/ctf-logo/`).
 */
export const ctfs = [
  {
    id: "avito",
    logo: "/ctf/avito.webp",
    name: "AvitoTech CTF 2026 · HoneyBadger",
    organizer: "AvitoTech × SPbCTF",
    date: "2026-09",
    certificate: "https://avitoctf.ru/certificate/xZWZgo4Y",
    scoreboard: null,
    post: "7509955416546766848",
    tags: ["Web & API", "Linux", "Forensics"],
  },
  {
    id: "faust",
    logo: "/ctf/faust.webp",
    name: "FAUST CTF 2026",
    organizer: "FAUST · FAU Erlangen-Nürnberg",
    date: "2026-09",
    certificate: null,
    scoreboard: "https://2026.faustctf.net/competition/scoreboard/",
    post: null,
    tags: ["Attack-Defense", "Team OpSec", "Exploitation", "Patching"],
  },
  {
    id: "alfa",
    logo: "/ctf/alfa.webp",
    name: "Alfa CTF 2026",
    organizer: "Alfa-Bank",
    date: "2026-06",
    certificate: null,
    scoreboard: null,
    post: "7469482293988958208",
    tags: ["Security League", "Team"],
  },
  {
    id: "aclabs",
    logo: null,
    name: "ACLabs International Open CTF",
    organizer: "Advanced Cyber Labs",
    date: "2026-04",
    certificate: null,
    scoreboard: null,
    post: "7457096732137406464",
    tags: ["Crypto", "Forensics", "OSINT", "Web"],
  },
  {
    id: "tctf",
    logo: "/ctf/tctf.webp",
    name: "T-CTF 2025",
    organizer: "T-Bank (Tinkoff)",
    date: "2025-04",
    certificate: null,
    scoreboard: null,
    post: null,
    tags: ["Web", "Infrastructure", "Crypto", "Reverse"],
  },
] as const;

export type CtfId = (typeof ctfs)[number]["id"];

export const projects = [
  {
    id: "shadowbox",
    tags: ["NestJS", "PostgreSQL", "Docker", "Nginx"],
    href: "https://github.com/alexandra-seredkina/ShadowBox-Backend",
  },
  { id: "site", tags: ["Next.js", "Strict CSP", "i18n", "a11y"], href: null },
] as const;

export type ProjectId = (typeof projects)[number]["id"];
