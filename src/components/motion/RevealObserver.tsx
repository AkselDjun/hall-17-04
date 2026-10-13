"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-shown])";
const CLIPPED = new Set(["type", "rise"]);

export function RevealObserver() {
  useEffect(() => {
    const show = (element: Element) => element.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(show);
      return;
    }

    const targets = new Map<Element, Set<Element>>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          targets.get(entry.target)?.forEach(show);
          targets.delete(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    const watch = (element: Element) => {
      const clipped = CLIPPED.has(element.getAttribute("data-reveal") ?? "");
      const anchor = clipped && element.parentElement ? element.parentElement : element;
      const group = targets.get(anchor);
      if (group) {
        group.add(element);
        return;
      }
      targets.set(anchor, new Set([element]));
      observer.observe(anchor);
    };

    const watchWithin = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(watch);
    watchWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) watch(node);
          watchWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
