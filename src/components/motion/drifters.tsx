"use client";
import { useEffect, useRef } from "react";

// home positions as a fraction of the viewport, so the set reads the same on any screen
// kinds: pill and dot are solid, tile borrows the event mark's corner, ring is an outline
const SHAPES = [
  { c: "#4285f4", w: 88, h: 34, x: 0.07, y: 0.30, r: -24, kind: "pill" },
  { c: "#ea4335", w: 26, h: 26, x: 0.18, y: 0.66, r: 0, kind: "dot" },
  { c: "#f9ab01", w: 62, h: 24, x: 0.85, y: 0.32, r: 34, kind: "pill" },
  { c: "#34a853", w: 34, h: 34, x: 0.91, y: 0.70, r: 0, kind: "dot" },
  { c: "#4285f4", w: 18, h: 18, x: 0.78, y: 0.14, r: 0, kind: "dot" },
  { c: "#ea4335", w: 54, h: 22, x: 0.12, y: 0.88, r: 18, kind: "pill" },
  { c: "#34a853", w: 30, h: 30, x: 0.04, y: 0.50, r: -8, kind: "tile" },
  { c: "#f9ab01", w: 22, h: 22, x: 0.73, y: 0.86, r: 14, kind: "tile" },
  { c: "#4285f4", w: 46, h: 46, x: 0.24, y: 0.07, r: 0, kind: "ring" },
  { c: "#ea4335", w: 16, h: 16, x: 0.95, y: 0.46, r: 0, kind: "dot" },
  { c: "#f9ab01", w: 72, h: 26, x: 0.63, y: 0.04, r: -14, kind: "pill" },
  { c: "#34a853", w: 26, h: 64, x: 0.03, y: 0.12, r: 12, kind: "pill" },
  { c: "#4285f4", w: 24, h: 24, x: 0.36, y: 0.93, r: -18, kind: "tile" },
  { c: "#ea4335", w: 38, h: 38, x: 0.88, y: 0.15, r: 0, kind: "ring" },
  { c: "#34a853", w: 20, h: 20, x: 0.66, y: 0.94, r: 0, kind: "dot" },
];

const DAMPING = 0.952;
const REACH = 54;

export function Drifters() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = layer.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(node.children) as HTMLElement[];
    // the static markup positions shapes with left/top; the loop drives them by translate instead
    for (const element of nodes) { element.style.left = "0px"; element.style.top = "0px"; }
    const parts = nodes.map((element, i) => ({
      element, ...SHAPES[i],
      px: SHAPES[i].x * window.innerWidth, py: SHAPES[i].y * window.innerHeight,
      vx: 0, vy: 0, rot: SHAPES[i].r, vr: 0, phase: i * 1.7,
    }));

    let pointer = { x: -1e4, y: -1e4, dx: 0, dy: 0, at: 0 };
    const onPointer = (e: PointerEvent) => {
      const x = e.clientX, y = e.clientY + window.scrollY;
      pointer = { dx: x - pointer.x, dy: y - pointer.y, x, y, at: performance.now() };
    };

    // on touch screens a shape can be picked up and carried; touches that miss every shape still scroll
    const EDGE = 72;
    let drag: { part: (typeof parts)[number]; id: number; ox: number; oy: number; cx: number; cy: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const part = parts.find(p => {
        const box = p.element.getBoundingClientRect();
        return box.width > 0 && touch.clientX > box.left - 12 && touch.clientX < box.right + 12
          && touch.clientY > box.top - 12 && touch.clientY < box.bottom + 12;
      });
      if (!part) return;
      e.preventDefault();
      drag = { part, id: touch.identifier, cx: touch.clientX, cy: touch.clientY,
        ox: touch.clientX - part.px, oy: touch.clientY + window.scrollY - part.py };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!drag) return;
      const touch = Array.from(e.touches).find(t => t.identifier === drag!.id);
      if (!touch) return;
      e.preventDefault();
      drag.cx = touch.clientX; drag.cy = touch.clientY;
    };
    const onTouchEnd = () => { drag = null; };

    let frame = 0;
    const step = (now: number) => {
      if (drag) {
        // holding near the top or bottom edge carries the shape further along the page
        if (drag.cy > window.innerHeight - EDGE) window.scrollBy(0, 9);
        else if (drag.cy < EDGE && window.scrollY > 0) window.scrollBy(0, -9);
        const p = drag.part;
        const x = drag.cx - drag.ox, y = drag.cy + window.scrollY - drag.oy;
        // the last step becomes the throw when the finger lifts
        p.vx = (x - p.px) * 0.6; p.vy = (y - p.py) * 0.6;
        p.px = x - p.vx; p.py = y - p.vy;
      }
      const limitY = document.documentElement.scrollHeight;
      const fresh = now - pointer.at < 120;
      for (const p of parts) {
        // a slow wander keeps the set alive when nobody is touching it
        p.vx += Math.sin(now * 0.00042 + p.phase) * 0.016;
        p.vy += Math.cos(now * 0.00031 + p.phase) * 0.016;

        if (fresh) {
          const cx = p.px + p.w / 2, cy = p.py + p.h / 2;
          const dx = cx - pointer.x, dy = cy - pointer.y;
          const distance = Math.hypot(dx, dy);
          const radius = Math.max(p.w, p.h) / 2 + REACH;
          if (distance < radius) {
            // shove away from the cursor, then add the cursor's own momentum
            const force = (1 - distance / radius) * 1.9;
            const inv = 1 / Math.max(distance, 1);
            p.vx += dx * inv * force + pointer.dx * 0.12;
            p.vy += dy * inv * force + pointer.dy * 0.12;
            p.vr += (pointer.dx - pointer.dy) * 0.04;
          }
        }

        p.vx *= DAMPING; p.vy *= DAMPING; p.vr *= 0.93;
        p.px += p.vx; p.py += p.vy; p.rot += p.vr;

        const maxX = window.innerWidth - p.w;
        if (p.px < 0) { p.px = 0; p.vx = Math.abs(p.vx) * 0.5; }
        if (p.px > maxX) { p.px = maxX; p.vx = -Math.abs(p.vx) * 0.5; }
        const maxY = limitY - p.h;
        if (p.py < 0) { p.py = 0; p.vy = Math.abs(p.vy) * 0.5; }
        if (p.py > maxY) { p.py = maxY; p.vy = -Math.abs(p.vy) * 0.5; }

        p.element.style.translate = `${p.px.toFixed(1)}px ${(p.py - window.scrollY).toFixed(1)}px`;
        p.element.style.rotate = `${p.rot.toFixed(1)}deg`;
      }
      frame = requestAnimationFrame(step);
    };

    const start = () => { if (!frame) frame = requestAnimationFrame(step); };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return <div className="drifters" ref={layer} aria-hidden="true">
    {SHAPES.map((shape, i) => <span key={i} data-shape={shape.kind} style={{
      width: `${shape.w}px`, height: `${shape.h}px`,
      ...(shape.kind === "ring" ? { borderColor: shape.c } : { background: shape.c }),
      left: `${shape.x * 100}%`, top: `${shape.y * 100}%`, rotate: `${shape.r}deg`,
    }} />)}
  </div>;
}
