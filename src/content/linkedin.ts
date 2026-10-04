/**
 * Posts mirrored from LinkedIn (text kept as published; hashtags moved to `tags`,
 * shortened lnkd.in links resolved to their targets). Newest first.
 * `id` is the LinkedIn activity id: the post lives at `linkedinPostUrl(id)`.
 */
export type LinkedinPost = {
  id: string;
  date: string;
  text: string;
  tags: string[];
  links?: { label: string; href: string }[];
};

export const linkedinPostUrl = (id: string) =>
  `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

export const linkedinPosts: LinkedinPost[] = [
  {
    id: "7509955416546766848",
    date: "2026-09-27",
    text: `Excited to share that I recently participated in AvitoTech CTF 2026 (HoneyBadger CTF)! 🦡🔥

It was an intense 30-hour online marathon with real-world cybersecurity challenges designed by the AvitoTech team and SPbCTF community. Competing in CTFs like this is always a fantastic opportunity to pressure-test skills, sharpen problem-solving under tight deadlines, and identify technical blind spots.

The tasks covered a wide array of InfoSec domains:
📌 Web Security & API — hunting for logic bugs and vulnerabilities in complex web applications.
📌 Infrastructure & Linux — analyzing system weaknesses and privilege escalation vectors.
📌 Code Analysis & Forensics — diving into source code and unraveling digital traces.

A big thank you to the AvitoTech team and SPbCTF for putting together high-quality, engineering-focused challenges! Always moving forward and preparing for the next competition. 🚀`,
    tags: ["CTF", "AvitoTech", "AppSec", "WebSecurity"],
    links: [{ label: "Certificate", href: "https://avitoctf.ru/certificate/xZWZgo4Y" }],
  },
  {
    id: "7491819031679926273",
    date: "2026-08-08",
    text: "180-day streak unlocked! 🐾🔥",
    tags: ["TryHackMe", "EthicalHacking"],
    links: [{ label: "Badge", href: "https://tryhackme.com/Meowness/badges/180-day-streak" }],
  },
  {
    id: "7469483483019800576",
    date: "2026-06-08",
    text: "Day 158 on TryHackMe. Consistency is the only way to stay ahead of the game in InfoSec. Keeping the fire burning.",
    tags: ["TryHackMe", "InfoSec"],
  },
  {
    id: "7469482293988958208",
    date: "2026-06-08",
    text: `Proud to have competed in Alfa CTF 2026 - one of the largest cybersecurity competitions in Russia, which brought together nearly 5,000 participants!

My team, joined the Security League and managed to break into the top 20% out of 513 competing teams. It was an intense marathon of solving complex, real-world security challenges. Events like this are the best way to find technical blind spots, test skills under pressure, and grow as a specialist.

Huge thanks to Alfa-Bank for organizing such a high-level event. Ready for the next one!`,
    tags: ["CTF", "AlfaBank", "AppSec"],
  },
  {
    id: "7457096732137406464",
    date: "2026-05-04",
    text: `I'm happy to share a recent achievement! From April 17th to 24th, I participated in the International Open CTF Competition on the Advanced Cyber Labs (ACLabs) platform.

It was a great opportunity to test my skills in conditions as close as possible to real combat missions. The competition covered a wide range of key information security areas:

📍 Crypto & Stego — data decryption and search for hidden information.
📍 Forensics — incident analysis and digital trace analysis.
📍 OSINT & GEOINT — open-source intelligence and geolocation analysis.
📍 Linux & Web — web vulnerability exploitation and system privilege escalation.

A huge thank you to the ACLabs.pro team for the awesome platform and high-quality tasks! Moving on. 🚀`,
    tags: ["CTF", "OSINT", "ACLabs"],
  },
  {
    id: "7456710521161998336",
    date: "2026-05-03",
    text: `I'm happy to share that I successfully completed the TryHackMe PT1 professional certification🛡️💻

The exam lasted 48 hours and consisted of a simulated real-world penetration testing project. To qualify, I had to not only find and exploit vulnerabilities in three different domains (Web, Network, and Active Directory), but also prepare a detailed security report.

Moving on! 🚀`,
    tags: ["PT1", "PenetrationTesting", "TryHackMe"],
    links: [
      {
        label: "Certificate",
        href: "https://assets.tryhackme.com/certification-certificate/69f5a30b47ac3c1ea4c5a76b.pdf",
      },
    ],
  },
  {
    id: "7456013115420401664",
    date: "2026-05-01",
    text: `Today, I successfully completed the Ledger room on TryHackMe. This marks my second Hard-level Active Directory challenge finished within a single day.

The scenario focused on exploiting Active Directory Certificate Services (AD CS) and identifying privilege escalation vectors within a domain environment. During the process, I practiced bypassing remote authentication restrictions and gaining full control over the domain infrastructure.`,
    tags: ["ActiveDirectory", "Pentest", "RedTeaming"],
  },
  {
    id: "7455988499117342720",
    date: "2026-05-01",
    text: `Hit a 136-day streak on TryHackMe 🫶

Over the last 2 years, the platform has become my go-to for hands-on practice. While I don't always manage a perfect daily run, this current 136-day streak is a solid indicator of staying consistent with the grind.`,
    tags: ["TryHackMe", "ActiveDirectory"],
  },
  {
    id: "7455986562498039809",
    date: "2026-05-01",
    text: "I just completed Reset room on TryHackMe! This challenge simulates a cyber-attack scenario where you must exploit an Active Directory environment.",
    tags: ["ActiveDirectory", "TryHackMe"],
  },
  {
    id: "7428417625677774848",
    date: "2026-02-14",
    text: "TryHackMe launched a new event, “Love at First Breach,” for Valentine's Day. I tried the first room today - it seemed easy, but fun. Excited to see what's next! Highly recommend everyone gives it a try!",
    tags: ["CTF", "TryHackMe"],
  },
  {
    id: "7409733187024842752",
    date: "2025-12-25",
    text: `I completed the “Active Directory Hardening” room on TryHackMe

It was a great opportunity to dive into Active Directory security and understand how to strengthen Windows domain infrastructure.

During the room, I learned about configuring password policies and disabling weak LM hashes to enhance security, applying the Least Privilege Model for users and services, using the Microsoft Security Compliance Toolkit to standardize and simplify Group Policy settings, as well as protecting against known attacks like Kerberoasting and practicing secure authentication via SMB/LDAP with digital signing.

This room demonstrated that even basic security measures can significantly reduce the risk of network compromise. It was especially valuable to see how to apply Microsoft's official recommendations in practice.

I recommend this room to anyone who wants to gain deeper insights into protecting corporate infrastructure.`,
    tags: ["ActiveDirectory", "Hardening", "BlueTeam"],
  },
  {
    id: "7403136483517177856",
    date: "2025-12-06",
    text: `I just completed the React2Shell: CVE-2025-55182 room on TryHackMe.

The vulnerability is very new: the public disclosure happened on December 3, 2025. This is a critical remote‑code‑execution flaw in React Server Components (and frameworks like Next.js), giving attackers the ability to run code on servers without authentication.

If you're working with React or Next.js, I highly recommend checking it out.`,
    tags: ["ReactJS", "NextJS", "RCE", "WebSecurity"],
    links: [{ label: "Room", href: "https://tryhackme.com/room/react2shellcve202555182" }],
  },
  {
    id: "7403070439557861377",
    date: "2025-12-06",
    text: `🚨 React2Shell – Critical RCE Vulnerability in React/Next.js 🚨

This vulnerability carries a maximum CVSS score of 10.0, meaning it is as critical as it gets.

fast fix:
➡️ npx fix-react2shell-next ⬅️

React2Shell is a critical RCE vulnerability in React Server Components caused by unsafe deserialization in the React Flight protocol. An attacker can execute code on the server without authentication. Vulnerable versions include react‑server‑dom‑webpack/parcel/turbopack from 19.0.0 to 19.2.0, and Next.js versions 15.x and 16.x using RSC. The fix is to update React RSC to 19.0.1, 19.1.2 or 19.2.1, and update Next.js to patched releases like 15.0.5, 15.1.9 or 16.0.7. If your app uses RSC, update immediately.`,
    tags: ["CVE-2025-55182", "React", "NextJS", "RCE"],
  },
];
