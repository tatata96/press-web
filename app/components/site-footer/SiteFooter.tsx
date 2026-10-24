import { getTranslations } from "next-intl/server";
import styles from "./site-footer.module.scss";

// TODO: placeholders until the real contact address and Instagram profile are
// confirmed.
const contactHref = "mailto:hello@example.com";
const instagramHref = "https://www.instagram.com/";

const siteDomain = "pressmagazine.com.tr";

export default async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <p className={`${styles.upper} type-footer`}>{t("credit")}</p>
          <p className="type-footer">{siteDomain}</p>
        </div>
        <ul className={`${styles.column} ${styles.links}`}>
          <li>
            <a href={contactHref} className={`${styles.link} type-footer`}>
              {t("contact")}
            </a>
          </li>
          <li>
            <a
              href={instagramHref}
              className={`${styles.link} type-footer`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
        <p className={`${styles.upper} ${styles.location} type-footer`}>
          {t("location")}
        </p>
      </div>
      {/* Decorative: fixed to the viewport bottom and clipped by the footer,
          so it is uncovered as the page scrolls to the end. */}
      <p className={`${styles.wordmark} type-display`} aria-hidden="true">
        Press
      </p>
    </footer>
  );
}
