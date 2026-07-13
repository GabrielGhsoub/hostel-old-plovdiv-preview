import { useEffect, useRef } from "react";

/* Adds .is-revealed to the ref'd element when it enters the viewport.
   Pair with CSS: [data-reveal]{opacity:0; transform:translateY(18px); transition:...}
   .is-revealed{opacity:1; transform:none}
   Respects prefers-reduced-motion (reveals immediately). */
export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
