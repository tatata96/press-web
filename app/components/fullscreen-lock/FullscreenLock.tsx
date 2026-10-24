"use client";

import { useEffect } from "react";

// Marks <body> while a single-screen page is shown (see globals.scss). The
// cleanup guarantees scrolling and the footer return when navigating away.
export default function FullscreenLock() {
  useEffect(() => {
    document.body.dataset.fullscreen = "";
    return () => {
      delete document.body.dataset.fullscreen;
    };
  }, []);

  return null;
}
