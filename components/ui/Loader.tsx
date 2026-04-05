// components/ui/Loader.tsx
// Full-screen loading animation that fades out after mount.

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Give the bar animation time to finish, then fade out
    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          style={{ background: "var(--bg)" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4"
        >
          {/* Logo mark */}
          <div className="font-head text-2xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
            Anantha<span style={{ color: "var(--accent)" }}>Shayan</span>
          </div>

          {/* Progress bar */}
          <div
            className="w-28 h-px overflow-hidden rounded-full"
            style={{ background: "var(--border)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--accent)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%", transition: { duration: 1.2, ease: "easeInOut" } }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
