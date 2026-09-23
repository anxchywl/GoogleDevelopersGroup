"use client";
import { useEffect } from "react";
import { numberShape } from "@/lib/site";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#$*";
const scramble = (final: string) =>
  Array.from(final).map((char) => (char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");

export function ScrollMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const q = <T extends HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
    const timers = new Set<number>();

    // the label ships as real text, then splits into a screen-reader copy and a scrambled visible copy
    // dev strict mode runs this effect twice, so the second pass must not read back the scrambled copy
    const cipher = (element: HTMLElement) => {
      const final = element.dataset.text ?? element.textContent ?? "";
      element.dataset.text = final;
      const spoken = document.createElement("span");
      spoken.className = "sr-only";
      spoken.textContent = final;
      const shown = document.createElement("span");
      shown.setAttribute("aria-hidden", "true");
      shown.textContent = scramble(final);
      element.replaceChildren(spoken, shown);
    };

    const decode = (element: HTMLElement) => {
      const final = element.dataset.text ?? element.textContent ?? "";
      element.dataset.text = final;
      if (reduced.matches) { element.textContent = final; return; }
      const shown = element.querySelector<HTMLElement>("[aria-hidden]") ?? element;
      const chars = Array.from(final);
      // long labels like the byline reveal several letters a tick so they finish as fast as short ones
      const stride = Math.max(1, Math.round(chars.length / 24));
      let step = 0;
      const tick = window.setInterval(() => {
        step += stride;
        shown.textContent = chars.map((char, i) => (i < step - 4 || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
        if (step >= chars.length + 6) { window.clearInterval(tick); timers.delete(tick); element.textContent = final; }
      }, 55);
      timers.add(tick);
    };

    const countUp = (element: HTMLElement) => {
      const final = element.dataset.text ?? element.textContent ?? "";
      element.dataset.text = final;
      const shape = numberShape(final);
      if (!shape || reduced.matches) return;
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / 900);
        element.textContent = t < 1 ? shape.at(Math.round(shape.target * (1 - (1 - t) ** 3))) : final;
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const labels = q<HTMLElement>("[data-decode]");
    if (!reduced.matches) for (const label of labels) cipher(label);

    for (const path of q<HTMLElement & SVGPathElement>("[data-draw]")) {
      path.style.setProperty("--draw", `${(path as unknown as SVGPathElement).getTotalLength()}`);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        if (element.hasAttribute("data-reveal")) element.dataset.visible = "true";
        if (element.dataset.pending) { delete element.dataset.pending; element.dataset.arrive = "true"; }
        for (const label of labels) if (element.contains(label) && !label.dataset.done) { label.dataset.done = "true"; decode(label); }
        for (const number of q<HTMLElement>("[data-count]")) if (element.contains(number) && !number.dataset.text) countUp(number);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    // only blocks still below the fold wait hidden for their entrance, so nothing already on screen flickers
    const pending = q("[data-reveal]").filter((target) => !reduced.matches && target.getBoundingClientRect().top > window.innerHeight * 0.94);
    for (const target of pending) target.dataset.pending = "true";
    for (const target of q("[data-reveal]")) observer.observe(target);
    // a label also decodes on its own arrival, so one near the fold of a tall block is not left scrambled
    for (const label of labels) if (!label.hasAttribute("data-reveal")) observer.observe(label);

    // leaving a hover cuts the css loop, which would snap the mark back, so the current
    // rendered values are handed to a short animation that eases them home instead
    const cleanups: (() => void)[] = [];
    const HOVERS: { trigger: string; target: string; parts: string; props: string[] }[] = [
      { trigger: ".hero-mark, .wordmark, .split", target: ".gdg-mark", parts: ".gdg-pulse", props: ["scale"] },
    ];
    for (const hover of HOVERS) {
      for (const trigger of q(hover.trigger)) {
        const target = trigger.matches(hover.target) ? trigger : trigger.querySelector<HTMLElement>(hover.target);
        if (!target) continue;
        const parts = Array.from(target.querySelectorAll<HTMLElement>(hover.parts));
        const home = parts.map((part) => {
          const style = getComputedStyle(part);
          return Object.fromEntries(hover.props.map((name) => [name, style[name as never] as string]));
        });

        const start = () => { target.dataset.spin = "true"; };
        const stop = () => {
          if (!target.dataset.spin) return;
          // read where the loop currently has them before switching it off, or the values are already home
          const frames = parts.map((part, i) => {
            const style = getComputedStyle(part);
            const from = Object.fromEntries(hover.props.map((name) => [name, style[name as never] as string]));
            // carry the spin forward to the next whole turn rather than unwinding it
            const to = from.rotate ? { ...home[i], rotate: `${Math.ceil((parseFloat(from.rotate) || 0) / 360) * 360}deg` } : home[i];
            return [from, to];
          });
          delete target.dataset.spin;
          if (reduced.matches) return;
          parts.forEach((part, i) => part.animate(frames[i], { duration: 620, easing: "cubic-bezier(.3,0,.2,1)" }));
        };

        trigger.addEventListener("pointerenter", start);
        trigger.addEventListener("pointerleave", stop);
        trigger.addEventListener("focusin", start);
        trigger.addEventListener("focusout", stop);
        cleanups.push(() => {
          trigger.removeEventListener("pointerenter", start);
          trigger.removeEventListener("pointerleave", stop);
          trigger.removeEventListener("focusin", start);
          trigger.removeEventListener("focusout", stop);
          delete target.dataset.spin;
        });
      }
    }

    // the wordmark returns to the very top, which a plain hash link cannot reach reliably
    const toTop = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced.matches ? "auto" : "smooth" });
    };
    const topLinks = q<HTMLAnchorElement>('a[href="#top"]');
    for (const link of topLinks) link.addEventListener("click", toTop);

    // a reload returns to the same point; safari does not always restore it on its own
    const spot = `scroll:${location.pathname}`;
    const remember = () => { try { sessionStorage.setItem(spot, String(Math.round(window.scrollY))); } catch {} };
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let saved = 0;
    if (navigation?.type === "reload") try { saved = Number(sessionStorage.getItem(spot)) || 0; } catch {}
    // instant, because the page-wide smooth scrolling would otherwise glide there from the top
    const restore = () => { if (saved > 0 && Math.abs(window.scrollY - saved) > 2) window.scrollTo({ top: saved, behavior: "instant" }); };
    restore();
    // the browser may still jump to an old hash or adjust after load, so the saved spot is applied once more when it settles
    const settle = () => requestAnimationFrame(() => {
      restore();
      // an arrival hash has done its job; dropping it keeps later reloads from jumping back to that section
      if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    });
    if (document.readyState === "complete") settle(); else window.addEventListener("load", settle, { once: true });
    window.addEventListener("pagehide", remember);

    // in-page links scroll without writing the hash, so a reload keeps the reader where they were
    const toSection = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const link = e.currentTarget as HTMLAnchorElement;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    const sectionLinks = q<HTMLAnchorElement>('a[href^="#"]:not([href="#top"]):not([href="#main"])');
    for (const link of sectionLinks) link.addEventListener("click", toSection);

    const days = q<HTMLElement>("[data-day]");
    const spied = q<HTMLElement>("main section[id]");
    const navLinks = new Map(q<HTMLAnchorElement>(".primary-nav a").map((a) => [a.hash.slice(1), a]));
    let frame = 0;

    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      for (const day of days) day.dataset.active = String(reduced.matches || day.getBoundingClientRect().top < view * 0.92);
      let current = "";
      for (const section of spied) if (section.getBoundingClientRect().top < view * 0.4) current = section.id;
      for (const [id, link] of navLinks) link.toggleAttribute("data-current", id === current);
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      for (const target of pending) delete target.dataset.pending;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", update);
      cancelAnimationFrame(frame);
      for (const link of topLinks) link.removeEventListener("click", toTop);
      for (const link of sectionLinks) link.removeEventListener("click", toSection);
      window.removeEventListener("pagehide", remember);
      window.removeEventListener("load", settle);
      for (const timer of timers) window.clearInterval(timer);
      for (const cleanup of cleanups) cleanup();
    };
  }, []);
  return null;
}
