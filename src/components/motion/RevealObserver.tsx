"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-shown])";

export function RevealObserver() {
  useEffect(() => {
    const show = (element: Element) => element.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    const watchWithin = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach((element) => observer.observe(element));
    watchWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) observer.observe(node);
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
