"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Homepage decoration: a thick ribbon that loops behind the hero, then runs
 * down the right side of the page, with a rocket that travels along it as
 * the visitor scrolls. Purely decorative and hidden from assistive tech.
 * With reduced motion the rocket stays parked in the hero loop.
 */

const MIN_WIDTH = 905; // matches the md breakpoint; hidden on phones
const CONTAINER_HALF = 640; // max-w-screen-xl / 2

type Geometry = { width: number; height: number; d: string; railX: number };

function buildPath(width: number, height: number): Geometry {
  const r = Math.min(170, Math.max(110, width * 0.1));
  const cx = Math.min(width * 0.8, width / 2 + CONTAINER_HALF - r * 1.2);
  const cy = 330;
  const gutter = width / 2 - CONTAINER_HALF;
  const railX =
    gutter >= 96 ? width / 2 + CONTAINER_HALF + gutter / 2 : width - 40;
  const end = Math.max(cy + r * 4, height - 140);
  const d = [
    `M ${width + 80} 120`,
    `C ${width - 40} 110, ${cx + r * 1.4} ${cy - r * 1.3}, ${cx} ${cy - r}`,
    `A ${r} ${r} 0 1 0 ${cx + r} ${cy}`,
    `C ${cx + r} ${cy + r * 1.6}, ${railX} ${cy + r * 1.2}, ${railX} ${cy + r * 2.6}`,
    `L ${railX} ${end}`,
  ].join(" ");
  return { width, height, d, railX };
}

export const JourneyRibbon: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
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
    if (!path || !rocket || !host || !geo) return;

    const total = path.getTotalLength();
    // Length where the rail starts (end of the loop and the curve out of it).
    const railStart = (() => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (Math.abs(path.getPointAtLength(mid).x - geo.railX) < 0.5) hi = mid;
        else lo = mid;
      }
      return hi;
    })();
    const startLength = railStart * 0.12;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Parked partway round the hero loop when motion is reduced.
    let length = reduce ? railStart * 0.45 : startLength;

    if (!reduce) {
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const scrolled = Math.max(0, window.scrollY - hostTop);
      const heroRange = window.innerHeight * 0.6;
      if (scrolled < heroRange) {
        // While the hero is in view, travel around the loop.
        length =
          startLength + (scrolled / heroRange) * (railStart - startLength);
      } else {
        // Then keep the rocket near the middle of the screen on the rail.
        const targetY = window.scrollY - hostTop + window.innerHeight * 0.55;
        const railTop = path.getPointAtLength(railStart).y;
        const y = Math.min(Math.max(targetY, railTop), geo.height - 160);
        let lo = railStart;
        let hi = total;
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2;
          if (path.getPointAtLength(mid).y < y) lo = mid;
          else hi = mid;
        }
        length = lo;
      }
    }

    const p = path.getPointAtLength(length);
    const q = path.getPointAtLength(Math.min(total, length + 1));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    // The rocket artwork points about 30° below horizontal.
    rocket.setAttribute(
      "transform",
      `translate(${p.x} ${p.y}) rotate(${angle - 30}) translate(-74 -68)`,
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
          <defs>
            <linearGradient
              id="journey-ribbon-fill"
              x1="0"
              y1="0"
              x2="0"
              y2={geo.height}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#97e1e5" />
              <stop offset="0.5" stopColor="#c0a2ff" />
              <stop offset="1" stopColor="#940050" />
            </linearGradient>
          </defs>
          <path
            d={geo.d}
            fill="none"
            stroke="url(#journey-ribbon-fill)"
            strokeOpacity="0.2"
            strokeWidth="46"
            strokeLinecap="round"
          />
          <path
            ref={pathRef}
            d={geo.d}
            fill="none"
            stroke="#97e1e5"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="2 10"
            strokeLinecap="round"
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
