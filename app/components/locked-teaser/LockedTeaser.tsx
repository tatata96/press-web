import { getTranslations } from "next-intl/server";
import styles from "./locked-teaser.module.scss";

// Placeholder for paid content: looks locked but does nothing until the
// Shopify purchase and server-side access flow exist.
export async function LockedTeaser() {
  const t = await getTranslations("ArticlePage");

  return (
    <section className={styles.teaser} aria-labelledby="locked-teaser-title">
      <p className={styles.label}>
        <svg
          className={styles.lock}
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <rect x="3" y="7" width="10" height="7" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" />
        </svg>
        {t("readMore")} · {t("locked")}
      </p>
      <button type="button" aria-disabled="true" className={styles.block}>
        <span id="locked-teaser-title" className={styles.title}>
          {t("lockedTitle")}
        </span>
      </button>
      <p className={styles.note}>{t("lockedNote")}</p>
    </section>
  );
}
