import Image from "next/image";
import styles from "./issue-grid.module.scss";

export type GridArticle = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  description: string;
};

type IssueGridProps = {
  label: string;
  newLabel: string;
  articles: readonly GridArticle[];
};

export default function IssueGrid({
  label,
  newLabel,
  articles,
}: IssueGridProps) {
  return (
    <section aria-label={label}>
      <ol className={styles.grid}>
        {articles.map(
          ({ src, width, height, alt, title, description }, index) => (
            <li key={src} className={styles.item}>
              <article className={styles.article}>
                <p className={styles.meta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{newLabel}</span>
                </p>
                <Image
                  src={src}
                  width={width}
                  height={height}
                  alt={alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={styles.image}
                />
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
              </article>
            </li>
          ),
        )}
      </ol>
    </section>
  );
}
