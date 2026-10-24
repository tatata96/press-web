"use client";

import { useEffect } from "react";

const TRIGGER_SCROLL_PX = 8;
const ANIMATION_DURATION_MS = 650;

// Scroll selects a state; elapsed time drives the animation to completion.
export default function HeaderScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let progress = window.scrollY > TRIGGER_SCROLL_PX ? 1 : 0;
    let target = progress;
    let offset = 0;

    const render = () => {
      root.style.setProperty("--header-progress", progress.toFixed(4));
      root.style.setProperty("--header-scroll-offset", `${offset}px`);
    };

    const animate = (next: number) => {
      if (next === target) return;
      if (frame) cancelAnimationFrame(frame);
      target = next;
      const from = progress;
      const started = performance.now();
      const duration = Math.max(1, ANIMATION_DURATION_MS * Math.abs(target - from));

      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        progress = from + (target - from) * eased;
        // Consume scrolling during the transition so the first spread stays
        // below the header and centred. Forward scrolling after completion
        // advances the content; returning upward releases the consumed space.
        offset = Math.max(0, window.scrollY);
        render();
        frame = elapsed < 1 ? requestAnimationFrame(tick) : 0;
        if (!frame) window.dispatchEvent(new Event("header-layout-change"));
      };
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reducedMotion.matches) return;
      // Never leave more spacer than the current scroll position. A fast
      // opening gesture can consume hundreds of pixels; keeping those pixels
      // on the way back up leaves a blank gap above the first spread.
      const nextOffset = Math.min(offset, Math.max(0, window.scrollY));
      if (nextOffset !== offset) {
        offset = nextOffset;
        render();
        window.dispatchEvent(new Event("header-layout-change"));
      }
      if (window.scrollY > TRIGGER_SCROLL_PX) animate(1);
      else if (window.scrollY <= 0) animate(0);
    };

    const onMotionChange = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      progress = reducedMotion.matches || window.scrollY > TRIGGER_SCROLL_PX ? 1 : 0;
      target = progress;
      offset = 0;
      render();
    };

    onMotionChange();
    window.addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", onMotionChange);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--header-progress");
      root.style.removeProperty("--header-scroll-offset");
    };
  }, []);

  return null;
}
