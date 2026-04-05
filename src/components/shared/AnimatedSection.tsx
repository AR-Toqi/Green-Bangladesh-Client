"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
}

export const AnimatedSection = ({ children, ...props }: AnimatedSectionProps) => {
  return (
    <motion.section {...props}>
      {children}
    </motion.section>
  );
};
