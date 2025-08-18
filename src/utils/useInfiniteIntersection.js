import { useEffect, useRef } from "react";

export default function useInfiniteIntersection(onIntersect, { root = null, rootMargin = "0px 0px 300px 0px", threshold = 0, enabled = true } = {}) {
  const targetRef = useRef(null);
  const obsRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current || !enabled) return;

    const el = targetRef.current;
    obsRef.current?.disconnect();

    const obs = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting || !enabled) return;

        obs.unobserve(el);
        try {
          await Promise.resolve(onIntersect?.());
        } finally {
          if (enabled) obs.observe(el);
        }
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [onIntersect, root, rootMargin, threshold, enabled]);

  return targetRef; // use as ref={returnedRef}
}
