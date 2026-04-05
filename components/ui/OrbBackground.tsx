"use client";

import { motion } from "framer-motion";

function Orb({
  gradient,
  width,
  height,
  top,
  left,
  right,
  bottom,
  xRange,
  yRange,
  scaleRange,
  dur,
}: {
  gradient: string;
  width: number;
  height: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  xRange: number[];
  yRange: number[];
  scaleRange: number[];
  dur: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: xRange[0], y: yRange[0], scale: scaleRange[0] }}
      animate={{
        opacity: 1,
        x: xRange,
        y: yRange,
        scale: scaleRange,
      }}
      transition={{
        opacity: { duration: 1.8, ease: "easeOut" },
        x: { duration: dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        y: { duration: dur * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        scale: { duration: dur * 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
      }}
      style={{
        position: "absolute",
        width,
        height,
        top,
        left,
        right,
        bottom,
        borderRadius: "50%",
        background: gradient,
        filter: "blur(88px)",
        pointerEvents: "none",
      }}
    />
  );
}

export function OrbBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", // 🔥 key change
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Orb
        gradient="radial-gradient(circle, rgba(108,127,255,0.50) 0%, transparent 68%)"
        width={720} height={720}
        top="-160px" left="-200px"
        xRange={[0, 70, 0]} yRange={[0, 50, 0]} scaleRange={[1, 1.1, 1]}
        dur={20}
      />

      <Orb
        gradient="radial-gradient(circle, rgba(139,92,246,0.42) 0%, transparent 68%)"
        width={620} height={620}
        bottom="-100px" right="-150px"
        xRange={[0, -55, 0]} yRange={[0, -65, 0]} scaleRange={[1, 1.14, 1]}
        dur={24}
      />

      <Orb
        gradient="radial-gradient(circle, rgba(52,211,153,0.28) 0%, transparent 68%)"
        width={460} height={460}
        top="28%" right="4%"
        xRange={[0, 45, 0]} yRange={[0, 75, 0]} scaleRange={[1, 0.9, 1]}
        dur={17}
      />

      <Orb
        gradient="radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 68%)"
        width={400} height={400}
        top="60%" left="3%"
        xRange={[0, 60, 0]} yRange={[0, -40, 0]} scaleRange={[1, 1.08, 1]}
        dur={19}
      />
    </div>
  );
}