
"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  initialScale = 1,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: initialScale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
