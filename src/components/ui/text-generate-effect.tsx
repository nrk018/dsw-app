"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  onComplete,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  onComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    const animation = animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth 165Hz feel
      }
    );
    
    if (onComplete) {
      const totalDuration = (duration || 1) + (wordsArray.length * 0.2);
      setTimeout(() => {
        onComplete();
      }, totalDuration * 1000);
    }
  }, [scope.current, onComplete, duration, filter, wordsArray.length]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="font-bold">
      <div className="mt-4">
        <div className={cn("leading-snug tracking-wide text-black dark:text-white", className || "text-2xl")}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
