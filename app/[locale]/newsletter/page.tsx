import { getTranslations, setRequestLocale } from "next-intl/server";
import NewsletterForm from "../../components/newsletter-form/NewsletterForm";
import styles from "./newsletter.module.scss";

export default async function NewsletterPage({
  params,
}: PageProps<"/[locale]/newsletter">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsletterPage");
  // The headline is broken into lines so each can be staggered in CSS.
  const rawLines = t.raw("headlineLines");
  const headlineLines: string[] = Array.isArray(rawLines)
    ? rawLines.filter((line): line is string => typeof line === "string")
    : [];

  return (
    <main className={styles.main}>
      <h1 className={`${styles.headline} type-body`}>
        {headlineLines.map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </h1>
      <section className={styles.signup} aria-labelledby="signup-heading">
        <h2 id="signup-heading" className={styles.signupTitle}>
          {t("signupTitle")}
        </h2>
        <NewsletterForm />
      </section>
    </main>
  );
}
