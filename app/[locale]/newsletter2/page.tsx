import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FullscreenLock from "../../components/fullscreen-lock/FullscreenLock";
import NewsletterForm from "../../components/newsletter-form/NewsletterForm";
import styles from "./newsletter2.module.scss";

// Decorative images sliding across a single, non-scrolling screen. Depth sets
// the layer: "back" images pass behind the form, "front" ones in front of it.
// `left` is the column (percent of the stage width), `width` the desktop width in vw,
// `duration` the seconds per crossing, `offset` where it starts in the loop
// (0–1, so they are spread out on load), and `reverse` the direction (up or down).
const SLIDERS = [
  {
    src: "/images/newsletter/news1.png",
    w: 396,
    h: 528,
    depth: "back",
    left: 3,
    width: 10,
    duration: 70,
    offset: 0.1,
    reverse: false,
  },
  {
    src: "/images/home/story-julian-barnes.png",
    w: 673,
    h: 853,
    depth: "back",
    left: 16,
    width: 11,
    duration: 80,
    offset: 0.55,
    reverse: true,
  },
  {
    src: "/images/newsletter/news2.png",
    w: 396,
    h: 528,
    depth: "mid",
    left: 30,
    width: 13,
    duration: 50,
    offset: 0.35,
    reverse: true,
  },
  {
    src: "/images/home/story-music-band.png",
    w: 1241,
    h: 1697,
    depth: "mid",
    left: 46,
    width: 13,
    duration: 55,
    offset: 0.8,
    reverse: false,
  },
  {
    src: "/images/home/cover-ezhel.png",
    w: 1244,
    h: 1689,
    depth: "front",
    left: 62,
    width: 16,
    duration: 34,
    offset: 0.65,
    reverse: false,
  },
  {
    src: "/images/home/story-art-gunes-terkol.png",
    w: 1244,
    h: 1699,
    depth: "front",
    left: 81,
    width: 17,
    duration: 38,
    offset: 0.2,
    reverse: true,
  },
] as const;

const LAYER = { back: 0, mid: 1, front: 3 } as const;

export default async function Newsletter2Page({
  params,
}: PageProps<"/[locale]/newsletter2">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsletterPage");

  return (
    <main className={styles.main}>
      <FullscreenLock />
      <div className={styles.images} aria-hidden="true">
        {SLIDERS.map((image) => (
          <Image
            key={image.src}
            className={`${styles.image} ${image.reverse ? styles.reverse : ""}`}
            src={image.src}
            width={image.w}
            height={image.h}
            alt=""
            sizes="(min-width: 900px) 21vw, 40vw"
            style={
              {
                "--left": `${image.left}%`,
                "--width": image.width,
                "--duration": `${image.duration}s`,
                "--delay": `${-image.duration * image.offset}s`,
                "--start": `${image.offset * 70}`,
                zIndex: LAYER[image.depth],
              } as CSSProperties
            }
          />
        ))}
      </div>
      <section className={styles.content} aria-labelledby="newsletter-heading">
        <h1 id="newsletter-heading" className={styles.heading}>
          {t("heading")}
        </h1>
        <div className={styles.panel}>
          <p className={styles.lead}>{t("lead")}</p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
