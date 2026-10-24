"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./home-intro.module.scss";

export default function HomeIntro({ children }: { children: ReactNode }) {
  const edge = useRef<HTMLDivElement>(null);
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

  return (
    <div className={styles.home} data-home-intro data-covered={covered}>
      <div className={styles.opening}>
        <h1 className={styles.masthead} aria-label="Press">
          <svg viewBox="0 0 1000 380" aria-hidden="true" focusable="false">
            <text x="16" y="310" textLength="968" lengthAdjust="spacingAndGlyphs">
              PRESS
            </text>
          </svg>
        </h1>
      </div>
      <div ref={edge} className={styles.edge} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
