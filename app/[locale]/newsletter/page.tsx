import { getTranslations, setRequestLocale } from "next-intl/server";
import FullscreenLock from "../../components/fullscreen-lock/FullscreenLock";
import NewsletterForm from "../../components/newsletter-form/NewsletterForm";
import ImageReel from "./ImageReel";
import styles from "./newsletter.module.scss";

const LEFT_REEL = [
  { src: "/images/newsletter/news1.png", width: 396, height: 528 },
  { src: "/images/home/cover-ezhel.png", width: 1244, height: 1689 },
  { src: "/images/home/story-julian-barnes.png", width: 673, height: 853 },
];

const RIGHT_REEL = [
  { src: "/images/newsletter/news2.png", width: 396, height: 528 },
  { src: "/images/home/story-music-band.png", width: 1241, height: 1697 },
  { src: "/images/home/story-art-gunes-terkol.png", width: 1244, height: 1699 },
];

export default async function NewsletterPage({
  params,
}: PageProps<"/[locale]/newsletter">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsletterPage");

  return (
    <main className={styles.main}>
      <FullscreenLock />
      <ImageReel images={LEFT_REEL} />
      <section className={styles.signup} aria-labelledby="newsletter-heading">
        <h1 id="newsletter-heading" className={styles.heading}>
          {t("heading")}
        </h1>
        <p className={styles.lead}>{t("lead")}</p>
        <p className={styles.body}>{t("body")}</p>
        <h2 className={styles.signupTitle}>{t("signupTitle")}</h2>
        <NewsletterForm />
      </section>
      <ImageReel images={RIGHT_REEL} reverse />
    </main>
  );
}
