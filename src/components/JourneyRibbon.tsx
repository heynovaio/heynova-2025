"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Homepage decoration from the 2027 refresh (Figma "Ribbon Path"): a dark
 * groove that sweeps in from the top right, curls once under the hero tags,
 * then runs down the right edge of the page and hooks left at the bottom.
 * A thin lavender line sits on top of the groove, and a rocket travels along
 * it as the visitor scrolls. Purely decorative and hidden from assistive tech.
 * With reduced motion the rocket stays parked just below the curl.
 */

const MIN_WIDTH = 905; // matches the md breakpoint; hidden on phones
const DESIGN_WIDTH = 1728; // Figma frame width the path was drawn at
const BAND_WIDTH = 72;

// Figma path data (design px). The hero part is anchored to the right edge
// and scaled with the viewport; the rail and hook are generated to fit the
// height of the page.
const BAND_INTRO = [
  [1740, 43.71],
  [1383.06, 19.85, 1089.11, 250.1, 1119.11, 482.24],
  [1124.85, 577.11, 1202.1, 629.61, 1278.87, 632.46],
  [1362.45, 635.56, 1445.48, 579.81, 1435.05, 455.82],
  [1426.16, 350.13, 1231.09, 307.68, 1231.09, 550.18],
  [1231.09, 588.77, 1249.66, 613.27, 1278.87, 632.46],
];
const BAND_OUT = [1388.22, 704.27, 1646.68, 701.5, 1637.96, 1084.29];
const LINE_INTRO = [
  [1754, 38.94],
  [1364.23, 20.09, 1050.41, 287.78, 1110.38, 495.14],
  [1139.89, 597.19, 1225.06, 639.89, 1301.59, 634.47],
  [1380.57, 628.88, 1450.34, 572.03, 1440.18, 476.29],
  [1420.2, 316.06, 1180.34, 344.33, 1230.31, 532.85],
  [1241.35, 574.5, 1267.52, 606.95, 1301.59, 634.47],
];
const LINE_OUT = [1421.71, 731.48, 1640.07, 767.18, 1640.07, 928.72];
const HOOK_LENGTH = 96; // how far the end of the rail turns back to the left
const ROCKET_PARK_Y = 757; // where the rocket sits in the Figma frame

type Geometry = {
  width: number;
  height: number;
  scale: number;
  band: string;
  line: string;
  bandIntro: string; // swoop + curl only, used to measure lengths
  bandHero: string; // swoop + curl + curve out to the rail
};

function buildPath(width: number, height: number): Geometry {
  const scale = Math.min(1, Math.max(0.62, width / DESIGN_WIDTH));
  const x = (v: number) => +(width + (v - DESIGN_WIDTH) * scale).toFixed(2);
  const y = (v: number) => +(v * scale).toFixed(2);
  const pt = (xs: number[]) =>
    xs.map((v, i) => (i % 2 === 0 ? x(v) : y(v))).join(" ");
  const curves = (segments: number[][]) =>
    `M ${pt(segments[0])} ` +
    segments
      .slice(1)
      .map((s) => `C ${pt(s)}`)
      .join(" ");

  const end = Math.max(y(1084.29) + 200, height - 200);
  const hook = HOOK_LENGTH * scale;

  const bandIntro = curves(BAND_INTRO);
  const bandHero = `${bandIntro} C ${pt(BAND_OUT)}`;
  const bandRail = x(BAND_OUT[4]);
  const band = `${bandHero} V ${end} H ${bandRail - hook}`;

  const lineRail = x(LINE_OUT[4]);
  const corner = 20 * scale;
  const line =
    `${curves(LINE_INTRO)} C ${pt(LINE_OUT)} V ${end - corner} ` +
    `C ${lineRail} ${end - corner * 0.45} ${lineRail - corner * 0.45} ${end} ${lineRail - corner} ${end} ` +
    `H ${bandRail - hook}`;

  return { width, height, scale, band, line, bandIntro, bandHero };
}

export const JourneyRibbon: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const introRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  // Size the drawing to the full height of the homepage content.
  useEffect(() => {
    const host = wrapRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const width = host.clientWidth;
      const height = host.scrollHeight;
      setGeo(width >= MIN_WIDTH ? buildPath(width, height) : null);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const placeRocket = useCallback(() => {
    const path = pathRef.current;
    const rocket = rocketRef.current;
    const host = wrapRef.current;
    if (
      !path ||
      !rocket ||
      !host ||
      !geo ||
      !introRef.current ||
      !heroRef.current
    )
      return;

    const total = path.getTotalLength();
    const introEnd = introRef.current.getTotalLength(); // end of the curl
    const railStart = heroRef.current.getTotalLength(); // top of the rail

    // Find the length along a stretch of path where y first reaches a value.
    const lengthAtY = (from: number, to: number, target: number) => {
      let lo = from;
      let hi = to;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < target) lo = mid;
        else hi = mid;
      }
      return lo;
    };
    const parkLength = lengthAtY(
      introEnd,
      railStart,
      ROCKET_PARK_Y * geo.scale,
    );
    const startLength = introEnd * 0.08;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let length = reduce ? parkLength : startLength;

    if (!reduce) {
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const scrolled = Math.max(0, window.scrollY - hostTop);
      const heroRange = window.innerHeight * 0.6;
      if (scrolled < heroRange) {
        // While the hero is in view, travel round the curl to the parking spot.
        length =
          startLength + (scrolled / heroRange) * (parkLength - startLength);
      } else {
        // Then keep the rocket near the middle of the screen on the rail.
        const targetY = window.scrollY - hostTop + window.innerHeight * 0.55;
        const parkY = path.getPointAtLength(parkLength).y;
        const railEnd = total - HOOK_LENGTH * geo.scale;
        const y = Math.min(
          Math.max(targetY, parkY),
          path.getPointAtLength(railEnd).y - 1,
        );
        length = lengthAtY(parkLength, railEnd, y);
      }
    }

    const p = path.getPointAtLength(length);
    const q = path.getPointAtLength(Math.min(total, length + 1));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    // The rocket artwork points about 30° below horizontal.
    rocket.setAttribute(
      "transform",
      `translate(${p.x} ${p.y}) rotate(${angle - 30}) scale(${geo.scale}) translate(-74 -68)`,
    );
  }, [geo]);

  useEffect(() => {
    if (!geo) return;
    placeRocket();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(placeRocket);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo, placeRocket]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="journey-ribbon pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {geo && (
        <svg
          width={geo.width}
          height={geo.height}
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          className="absolute top-0 left-0"
          focusable="false"
        >
          {/* Measuring paths only, never painted. */}
          <path ref={introRef} d={geo.bandIntro} fill="none" stroke="none" />
          <path ref={heroRef} d={geo.bandHero} fill="none" stroke="none" />

          <path
            ref={pathRef}
            d={geo.band}
            fill="none"
            stroke="#0F002E"
            strokeWidth={BAND_WIDTH * geo.scale}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={geo.line}
            fill="none"
            stroke="#C0A2FF"
            strokeOpacity="0.36"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g ref={rocketRef} className="journey-rocket">
            <path
              d="M113.545 99.2856L122.747 99.0843C125.959 99.0128 127.911 95.5172 126.287 92.7452L121.632 84.8054C116.844 76.64 109.96 69.8985 101.694 65.2822L37.8068 29.6042L22.5796 56.8708L86.4665 92.5489C94.7327 97.1651 104.081 99.4884 113.546 99.2832L113.545 99.2856Z"
              fill="#063A59"
              stroke="#009DAA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g
              fill="none"
              stroke="#97E1E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M98.9549 73.8134C97.7555 78.3573 95.4273 82.5264 92.1878 85.931" />
              <path d="M30.2542 43.5604L42.0832 50.1664" />
              <path d="M109.854 72.915C108.73 77.006 107.047 81.1504 104.793 85.1873C102.538 89.2241 99.8927 92.831 96.9989 95.9332" />
              <path d="M41.6659 23.1559L51.9047 4.82178C58.126 8.29608 62.1056 14.7444 62.4193 21.8628C62.869 31.9986 66.5861 41.709 73.0051 49.548" />
              <path d="M18.8342 64.0192L8.62631 82.298C14.8476 85.7723 22.4251 85.7781 28.6502 82.3112C37.5561 77.3559 47.8271 75.4321 57.9133 76.8231" />
              <path d="M26.9688 36.554L23.8341 34.8034L28.5996 26.2702L36.3196 30.5814" />
              <path d="M22.8866 43.864L19.7519 42.1134L14.9865 50.6466L22.7065 54.9579" />
              <path d="M58.1829 12.2216L52.8264 21.8132" />
              <path d="M23.1497 74.956L17.7918 84.55" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};
