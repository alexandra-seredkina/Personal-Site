import { z } from "zod";

export const postMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(200).default(""),
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
  readingMinutes: z.number().int().positive(),
  /** Alt text for the cover at `public/posts/<slug>.jpg`; required when that file exists. */
  coverAlt: z.string().min(1).optional(),
  draft: z.boolean().default(false),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

/** Validates the `export const metadata` of an MDX post; fails the build on invalid content. */
export function parsePostMeta(input: unknown, file: string): PostMeta {
  const result = postMetaSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid metadata in ${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
