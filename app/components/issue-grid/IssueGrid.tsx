import Image from "next/image";
import type { Spread } from "../issue-scroller/spreads";
import styles from "./issue-grid.module.scss";

type IssueGridProps = {
  label: string;
  spreads: readonly (Spread & { alt: string })[];
};

// The first spread is the cover story, centred on its own row at the same
// size as the rest, which sit two per row.
export default function IssueGrid({ label, spreads }: IssueGridProps) {
  return (
    <section aria-label={label}>
      <ol className={styles.grid}>
        {spreads.map(({ src, width, height, alt }, index) => (
          <li key={src} className={styles.spread}>
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={index === 0}
              className={styles.image}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
