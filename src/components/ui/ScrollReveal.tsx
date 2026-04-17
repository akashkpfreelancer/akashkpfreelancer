"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface Props extends Omit<MotionProps, "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 18 },
  down:  { y: -18 },
  left:  { x: 20 },
  right: { x: -20 },
  none:  {},
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  ...rest
}: Props) {
  const offset = { ...directionMap[direction] };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
