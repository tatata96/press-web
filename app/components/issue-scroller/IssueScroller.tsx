import Image from "next/image";
import type { Spread } from "./spreads";
import styles from "./issue-scroller.module.scss";

type IssueScrollerProps = {
  label: string;
  spreads: readonly (Spread & { alt: string })[];
};

// Text comes in as props: resolving translations inside this component makes
// Next.js flag the route as reading runtime data outside <Suspense>.
export default function IssueScroller({ label, spreads }: IssueScrollerProps) {
  // The region is focusable so keyboard users can scroll it with the arrow keys.
  return (
    <section className={styles.scroller} aria-label={label} tabIndex={0}>
      <ol className={styles.list}>
        {spreads.map(({ src, width, height, alt }, index) => (
          <li key={src} className={styles.spread}>
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              sizes="(min-width: 768px) 50vw, 80vw"
              loading={index === 0 ? "eager" : "lazy"}
              className={styles.image}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
