"use client";

import { useEffect } from "react";

/**
 * Slice Machine's <SliceSimulator> mounts outside the main <Layout> we
 * use on real pages, so the body never gets the `bg-primary` class that
 * triggers the gradient background. Dark-themed slices end up white-on-
 * white in the editor preview.
 *
 * This client component is a side-effect-only mount: it adds the class
 * while the simulator is open and removes it on unmount.
 */
export function SliceSimulatorBackground() {
  useEffect(() => {
    document.body.classList.add("bg-primary");
    return () => {
      document.body.classList.remove("bg-primary");
    };
  }, []);

  return null;
}
