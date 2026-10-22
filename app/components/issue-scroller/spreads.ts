export type Spread = {
  src: string;
  width: number;
  height: number;
};

// Each file is one full spread (two magazine pages) exported from
// issues/n1/issue-001.pdf. Alt text is generic until editorial supplies
// descriptions for each spread.
export const issueOneSpreads: readonly Spread[] = Array.from(
  { length: 8 },
  (_, index) => ({
    src: `/issues/n1/page-${String(index + 1).padStart(2, "0")}.webp`,
    width: 2494,
    height: 1700,
  }),
);
