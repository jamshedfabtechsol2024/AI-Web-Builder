"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";

const Typeanimation = ({
  words = [" existence", " reality", " the Internet"],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
  gradientFrom = "blue-500",
  gradientTo = "purple-600",
}) => {
  const sequence = words.flatMap((word) => [word, pauseDuration]);

  return (
    <motion.span
      animate={{ opacity: 1 }}
      className={cn(
        `bg-gradient-to-r bg-clip-text text-transparent from-${gradientFrom} to-${gradientTo}`,
        className
      )}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <TypeAnimation
        className=""
        deletionSpeed={deletingSpeed}
        repeat={Number.POSITIVE_INFINITY}
        sequence={sequence}
        speed={typingSpeed}
        wrapper="span"
      />
    </motion.span>
  );
};

export default Typeanimation;
