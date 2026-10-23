import { getTranslations, setRequestLocale } from "next-intl/server";
import NewsletterForm from "../../components/newsletter-form/NewsletterForm";
import styles from "./newsletter.module.scss";

export default async function NewsletterPage({
  params,
}: PageProps<"/[locale]/newsletter">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsletterPage");

  return (
    <main className={styles.main}>
      <section className={styles.section} aria-labelledby="newsletter-heading">
        <h1 id="newsletter-heading" className={styles.heading}>
          {t("heading")}
        </h1>
        <div className={styles.copy}>
          <p>
            <strong>{t("lead")}</strong>
          </p>
          <p>{t("body")}</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="signup-heading">
        <h2 id="signup-heading" className={styles.signupTitle}>
          {t("signupTitle")}
        </h2>
        <NewsletterForm />
      </section>
    </main>
  );
}
