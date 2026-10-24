"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./home-intro.module.scss";

const PARALLAX_RATE = 0.5;
// Must match --cover-final-scale in the stylesheet.
const COVER_FINAL_SCALE = 1.56;

export default function HomeIntro({ children }: { children: ReactNode }) {
  const edge = useRef<HTMLDivElement>(null);
  const masthead = useRef<HTMLHeadingElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const t = useTranslations("HomeIntro");
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const marker = edge.current;
    if (!marker) return;
    const opening = marker.closest("[data-home-intro]");
    opening?.setAttribute("data-intro-active", "true");

    const observer = new IntersectionObserver(
      () => setCovered(marker.getBoundingClientRect().bottom <= 0),
      { threshold: [0, 1] },
    );
    observer.observe(marker);
    return () => {
      observer.disconnect();
      opening?.removeAttribute("data-intro-active");
    };
  }, []);

  // The masthead is fixed, so it drifts up at half the scroll speed while the
  // cover scrolls at full speed. By the time the cover reaches its pinned
  // position it has grown to its final size.
  // Skipped for reduced motion.
  useEffect(() => {
    const title = masthead.current;
    const pinned = cover.current;
    const wrapper = stage.current;
    if (!title || !pinned || !wrapper) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const pinTop = parseFloat(getComputedStyle(pinned).top);
      const stageTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(
        Math.max(window.scrollY / (stageTop - pinTop), 0),
        1,
      );
      title.style.transform = `translate3d(0, ${-window.scrollY * PARALLAX_RATE}px, 0)`;
      pinned.style.transform = `scale(${1 + progress * (COVER_FINAL_SCALE - 1)})`;
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
      pinned.style.transform = "";
    };
  }, []);

  return (
    <div className={styles.home} data-home-intro data-covered={covered}>
      <div className={styles.opening}>
        <h1 ref={masthead} className={styles.masthead} aria-label="Press">
          <svg viewBox="0 0 1000 380" aria-hidden="true" focusable="false">
            <text x="16" y="310" textLength="968" lengthAdjust="spacingAndGlyphs">
              PRESS
            </text>
          </svg>
        </h1>
      </div>
      <div ref={stage} className={styles.stage}>
        {/* Flips the header in once the cover reaches its pinned position. */}
        <div ref={edge} className={styles.edge} aria-hidden="true" />
        <div ref={cover} className={styles.cover}>
          {/* Alt is empty until the cover story caption copy is confirmed. */}
          <Image
            src="/images/home/cover-ezhel.png"
            width={1244}
            height={1689}
            alt=""
            sizes="(min-width: 768px) 32vw, 58vw"
            priority
            className={styles.coverImage}
          />
          <h2 className={styles.coverTitle}>
            {t.raw("coverLines").map((line: string) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
