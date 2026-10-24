"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./home-intro.module.scss";

const PARALLAX_RATE = 0.8;

// Lives for the browser session (reset by a full reload): once the visitor has
// left the page, later client-side visits start at the pinned cover with the
// header. The leave is deferred a tick so Strict Mode's immediate effect
// re-run is not mistaken for navigating away.
let introLeft = false;
let pendingLeave: ReturnType<typeof setTimeout> | undefined;

export default function HomeIntro({ children }: { children: ReactNode }) {
  const edge = useRef<HTMLDivElement>(null);
  const masthead = useRef<HTMLHeadingElement>(null);
  const t = useTranslations("HomeIntro");
  const [skipOpening, setSkipOpening] = useState(() => introLeft);
  const [covered, setCovered] = useState(skipOpening);

  // Cached pages stay mounted when hidden, so a return visit can be a re-show
  // of this same instance; flag it to skip the opening before it is shown again.
  useEffect(() => {
    clearTimeout(pendingLeave);
    const shownAt = window.location.pathname;
    // A refresh restores the old scroll position, which would land mid-way
    // through the opening; the opening always starts from the top.
    let restore = 0;
    if (!introLeft) {
      window.scrollTo(0, 0);
      restore = requestAnimationFrame(() => window.scrollTo(0, 0));
    }
    return () => {
      cancelAnimationFrame(restore);
      pendingLeave = setTimeout(() => {
        // Only a real navigation counts; refreshes and effect re-runs stay put.
        if (window.location.pathname === shownAt) return;
        introLeft = true;
        setSkipOpening(true);
        setCovered(true);
      }, 0);
    };
  }, []);

  useEffect(() => {
    const marker = edge.current;
    if (!marker) return;
    const opening = marker.closest("[data-home-intro]");
    opening?.setAttribute("data-intro-active", "true");

    if (skipOpening) {
      return () => opening?.removeAttribute("data-intro-active");
    }

    const observer = new IntersectionObserver(
      () => setCovered(marker.getBoundingClientRect().bottom <= 0),
      { threshold: [0, 1] },
    );
    observer.observe(marker);
    return () => {
      observer.disconnect();
      opening?.removeAttribute("data-intro-active");
    };
  }, [skipOpening]);

  // The masthead is fixed, so it drifts up at 80% of the scroll speed while the
  // cover scrolls at full speed. Skipped for reduced motion.
  useEffect(() => {
    const title = masthead.current;
    if (!title || skipOpening) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      title.style.transform = `translate3d(0, ${-window.scrollY * PARALLAX_RATE}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      title.style.transform = "";
    };
  }, [skipOpening]);

  return (
    <div
      className={`${styles.home} ${skipOpening ? styles.skipOpening : ""}`}
      data-home-intro
      data-covered={covered}
    >
      <div className={styles.opening}>
        <h1 ref={masthead} className={styles.masthead} aria-label="Press">
          <svg viewBox="0 0 1000 380" aria-hidden="true" focusable="false">
            <text
              x="16"
              y="310"
              textLength="968"
              lengthAdjust="spacingAndGlyphs"
            >
              PRESS
            </text>
          </svg>
        </h1>
      </div>
      <div className={styles.stage}>
        {/* Flips the header in once the cover reaches its pinned position. */}
        <div ref={edge} className={styles.edge} aria-hidden="true" />
        <div className={styles.cover}>
          <p className={styles.coverMeta}>
            <span>01</span>
            <span>{t("new")}</span>
          </p>
          {/* Alt is empty until the cover story caption copy is confirmed. */}
          <Image
            src="/images/home/cover-ezhel.png"
            width={1244}
            height={1689}
            alt=""
            sizes="(min-width: 768px) 25vw, 70vw"
            priority
            className={styles.coverImage}
          />
          <h2 className={styles.coverTitle}>
            {t.raw("coverLines").map((line: string) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className={styles.coverDescription}>{t("coverDescription")}</p>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
