import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { team } from "./team";
import styles from "./about.module.scss";

function toStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <main className={styles.main}>
      <section className={`${styles.hero} ${styles.section}`}>
        <p className={`${styles.mono} ${styles.heroTagline}`}>
          {toStrings(t.raw("hero.tagline")).map((line) => (
            <span key={line} className={styles.block}>
              {line}
            </span>
          ))}
        </p>
        <h1 className={styles.logo}>Press</h1>
        <p className={`${styles.mono} ${styles.heroIssue}`}>
          {t("hero.issue")}
        </p>
        <p className={`${styles.mono} ${styles.heroText}`}>
          {t("hero.description")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="what-heading">
        <h2 id="what-heading" className={styles.heading}>
          {t("what.heading")}
        </h2>
        <div className={styles.copy}>
          <p>{t.rich("what.body", { b: bold })}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pair}`}>
        <div className={styles.pairItem}>
          <h2 className={styles.heading}>{t("where.heading")}</h2>
          <div className={styles.copy}>
            {toStrings(t.raw("where.paragraphs")).map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <div className={styles.pairItem}>
          <h2 className={styles.heading}>{t("when.heading")}</h2>
          <div className={styles.copy}>
            <p>{t("when.body")}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="how-heading">
        <div className={styles.column}>
          <h2 id="how-heading" className={styles.heading}>
            {t("how.heading")}
          </h2>
          <div className={styles.copy}>
            <p>
              <strong>{t("how.lead")}</strong>
            </p>
            <p>{t("how.body")}</p>
          </div>
        </div>
        <div className={`${styles.copy} ${styles.notes}`}>
          {toStrings(t.raw("how.notes")).map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.column}>
          <h2 id="why-heading" className={styles.heading}>
            {t("why.heading")}
          </h2>
          <div className={styles.copy}>
            <p>
              <strong>{t("why.lead")}</strong>
            </p>
            <p>{t("why.body")}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="who-heading">
        <div className={styles.column}>
          <h2 id="who-heading" className={styles.heading}>
            {t("who.heading")}
          </h2>
          <div className={styles.copy}>
            {toStrings(t.raw("who.paragraphs")).map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <ul className={styles.team} aria-label={t("who.teamLabel")}>
          {team.map(({ name, roleKey }) => (
            <li key={roleKey} className={styles.member}>
              <span className={styles.mono}>{name}</span>
              <span>{t(`who.roles.${roleKey}`)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
