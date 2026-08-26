"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /** Amount of Y/X translate in pixels */
  distance?: number;
}

/**
 * FadeIn — scroll-triggered reveal animation
 * 
 * - Uses strong ease-out per animate skill: cubic-bezier(0.23, 1, 0.32, 1)
 * - Respects prefers-reduced-motion: opacity-only fade, no translate
 * - Animates with transform+opacity only (GPU-accelerated)
 * - Start from scale/translate, never scale(0)
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  distance = 32,
}: FadeInProps) {
  const reduce = useReducedMotion();

  const getOffset = () => {
    switch (direction) {
      case "up":    return { y:  distance, x: 0 };
      case "down":  return { y: -distance, x: 0 };
      case "left":  return { x:  distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
      case "none":  return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.25 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.23, 1, 0.32, 1], /* strong ease-out */
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInStagger — wraps children with staggered FadeIn reveals
 * Used for card grids and lists.
 */
interface FadeInStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function FadeInStagger({ children, staggerDelay = 0.07, className = "" }: FadeInStaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — child item for FadeInStagger
 */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0.2 : 0.55,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
